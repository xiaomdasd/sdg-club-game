// CloudBase 配置
const CLOUD_BASE_DEFAULTS = {
    enabled: false,
    apiUrl: ''
};

const cloudBaseConfig = {
    ...CLOUD_BASE_DEFAULTS,
    ...(window.CLOUDBASE_CONFIG || {})
};

async function requestMbtiFromCloudBase(prompt) {
    if (!cloudBaseConfig.enabled || !cloudBaseConfig.apiUrl) {
        return null;
    }

    try {
        const response = await fetch(cloudBaseConfig.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                selectedClub: gameState.selectedClub,
                answers: buildAnswerPayload(),
                lang: currentLang
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('CloudBase HTTP Error:', error);
        throw error;
    }
}

function buildAnswerPayload() {
    return gameState.levels.map((level, idx) => {
        const choiceIndex = gameState.choices[idx] || 0;
        const choice = level.choices[choiceIndex];
        return {
            level: idx + 1,
            title: level.title,
            description: level.description,
            choiceIndex,
            choiceText: choice ? choice.text : ''
        };
    });
}

// ===================== 多语言系统 =====================
let currentLang = 'en';

const i18n = {
    en: {
        subtitle: 'Discover your MBTI personality type through club activities',
        startBtn: 'Start Game',
        chooseClub: 'Choose Your Club',
        chooseClubDesc: 'Select an SDG club that interests you to begin your journey',
        level: 'Level',
        npcQuestionName: 'Zebra Coordinator',
        npcQuestionRole: 'Order-loving Organizer',
        npcAnswerName: 'Rabbit Volunteer',
        npcAnswerRole: 'Energetic Rookie from Zootopia',
        chooseReply: 'Choose how this NPC replies',
        congrats: '🎉 Congratulations! You\'ve completed all levels!',
        analyzing: 'Analyzing your MBTI type...',
        playAgain: 'Play Again',
        resultTitle: 'Your MBTI, Skills, Interests & Career Advice',
        typicalType: 'The typical MBTI type for the club',
        youChoseIs: 'you chose is',
        advancedStage: 'Advanced Stage',
        skillsTitle: 'Skills',
        interestsTitle: 'Interests',
        skillsFallback: 'usually develop strengths that fit this type\'s way of observing the world and making decisions, such as using their values to guide actions, working reliably with others, and caring about real‑world impact. Your gameplay choices around SDG activities also show a willingness to plan, coordinate and follow through on meaningful projects.',
        interestsFallback: 'activity suggests you may enjoy topics related to sustainable development, community building and helping others. People of type',
        interestsFallback2: 'often prefer environments where they can see concrete results, support people around them and contribute to long‑term positive change.',
        typicalMatch: 'This type typically matches people who choose this club, as the club\'s activities and values align with the traits of',
        basedOnChoices: 'Based on your choices in the',
        clubActivities: 'club activities, your MBTI type is likely'
    },
    zh: {
        subtitle: '参加可持续发展社团活动，探索你的MBTI与未来职业发展',
        startBtn: '开始游戏',
        chooseClub: '选择你的社团',
        chooseClubDesc: '选择一个你感兴趣的SDG社团，开启你的旅程',
        level: '关卡',
        npcQuestionName: '斑马协调官',
        npcQuestionRole: '条理分明的组织者',
        npcAnswerName: '兔子志愿官',
        npcAnswerRole: '来自动物城的活力新秀',
        chooseReply: '选择兔子志愿官的回答',
        congrats: '🎉 恭喜你！你已完成所有关卡！',
        analyzing: '正在分析你的MBTI类型...',
        playAgain: '再玩一次',
        resultTitle: '你的MBTI、技能、兴趣与职业建议',
        typicalType: '你所选社团',
        youChoseIs: '的典型MBTI类型是',
        advancedStage: '进阶阶段',
        skillsTitle: '技能',
        interestsTitle: '兴趣',
        skillsFallback: '类型的人通常在观察世界和做决策方面有独特优势，例如以价值观引导行动、与他人可靠协作、关注现实世界的影响。你在SDG活动中的选择也展现了规划、协调和执行有意义项目的意愿。',
        interestsFallback: '活动的兴趣表明你可能喜欢与可持续发展、社区建设和帮助他人相关的话题。',
        interestsFallback2: '类型的人通常喜欢能看到实际成果、支持身边的人并为长期积极变化做贡献的环境。',
        typicalMatch: '这个类型通常与选择该社团的人匹配，因为社团的活动和价值观与该类型的特质相吻合。',
        basedOnChoices: '根据你在',
        clubActivities: '社团活动中的选择，你的MBTI类型可能是'
    }
};

function t(key) {
    return i18n[currentLang][key] || i18n['en'][key] || key;
}

// ===================== 社团数据（英文） =====================
const clubs_en = [
    { id: 1, sdg: 'SDG 1 No Poverty', name: 'Lift Up Club', activity: 'Campus Idle Goods Donation Drive', mbti: 'ESFJ', slogan: 'Small gifts, big warmth' },
    { id: 2, sdg: 'SDG 2 Zero Hunger', name: 'Food Saver Club', activity: 'Clean Plate Challenge & Awareness', mbti: 'ISFJ', slogan: 'Save every bite, fight hunger' },
    { id: 3, sdg: 'SDG 3 Good Health & Well-being', name: 'Well Youth Club', activity: 'Campus Mental Health Workshop', mbti: 'ENFJ', slogan: 'Nurture mind, thrive fully' },
    { id: 4, sdg: 'SDG 4 Quality Education', name: 'Bright Mind Club', activity: 'Community Academic Tutoring', mbti: 'INFJ', slogan: 'Knowledge lights up dreams' },
    { id: 5, sdg: 'SDG 5 Gender Equality', name: 'Equal Voice Club', activity: 'Gender Equality Talk', mbti: 'ENTP', slogan: 'Break bias, equal power for all' },
    { id: 6, sdg: 'SDG 6 Clean Water & Sanitation', name: 'Water Keeper Club', activity: 'Water-Saving & Quality Check', mbti: 'ISTJ', slogan: 'Save water, guard life\'s source' },
    { id: 7, sdg: 'SDG 7 Affordable & Clean Energy', name: 'Green Power Club', activity: 'Solar Device DIY Workshop', mbti: 'INTJ', slogan: 'Green energy, better future' },
    { id: 8, sdg: 'SDG 8 Decent Work & Growth', name: 'Career Boost Club', activity: 'Green Career Sharing Session', mbti: 'ENTJ', slogan: 'Green career, steady growth' },
    { id: 9, sdg: 'SDG 9 Industry, Innovation & Infra', name: 'Tech Up Club', activity: 'Upcycled Tech Creation Contest', mbti: 'INTP', slogan: 'Upcycle old parts, innovate new tech' },
    { id: 10, sdg: 'SDG 10 Reduced Inequalities', name: 'Inclusion Hub', activity: 'Barrier-Free Experience & Fellowship', mbti: 'ESFP', slogan: 'No barriers, full inclusion' },
    { id: 11, sdg: 'SDG 11 Sustainable Cities & Communities', name: 'Livable Community Club', activity: 'Corridor Green Beautification Volunteer', mbti: 'ISFP', slogan: 'Green our space, warm our home' },
    { id: 12, sdg: 'SDG 12 Responsible Consumption & Production', name: 'Circular Living Club', activity: 'Campus Sustainable Flea Market', mbti: 'ESTP', slogan: 'Swap, reuse, consume responsibly' },
    { id: 13, sdg: 'SDG 13 Climate Action', name: 'Climate Action Crew', activity: 'Carbon Footprint Calculation & Talk', mbti: 'INFP', slogan: 'Small acts, big climate impact' },
    { id: 14, sdg: 'SDG 14 Life Below Water', name: 'Ocean Guardian Club', activity: 'Marine Life Protection Exhibition', mbti: 'ENFP', slogan: 'Protect oceans, save marine life' },
    { id: 15, sdg: 'SDG 15 Life on Land', name: 'Earth Keeper Club', activity: 'Mountain Cleanup & Plant Protection', mbti: 'ESTJ', slogan: 'Clean lands, guard all creatures' },
    { id: 16, sdg: 'SDG 16 Peace, Justice & Institutions', name: 'Justice Youth Club', activity: 'Legal Knowledge Quiz', mbti: 'ISFP', slogan: 'Uphold justice, safeguard peace' },
    { id: 17, sdg: 'SDG 17 Partnerships for the Goals', name: 'Synergy Hub', activity: 'Inter-Club SDG Project Match', mbti: 'ENFP', slogan: 'Unite strengths, advance SDGs' }
];

// ===================== 社团数据（中文） =====================
const clubs_zh = [
    { id: 1, sdg: 'SDG 1 无贫穷', name: '筑梦扶困公益社', activity: '校园闲置物资定向募捐行动', mbti: 'ESFJ', slogan: '予人微光，汇聚星河，让闲置温暖每一份渴望' },
    { id: 2, sdg: 'SDG 2 零饥饿', name: '食光守护社', activity: '校园光盘打卡&剩食科普宣传活动', mbti: 'ISFJ', slogan: '珍惜每粒米，守护舌尖暖，用行动筑牢反饥饿防线' },
    { id: 3, sdg: 'SDG 3 良好健康与福祉', name: '青春健康赋能社', activity: '校园心理健康团体辅导活动', mbti: 'ENFJ', slogan: '关照心灵，拥抱暖阳，让青春在健康里肆意生长' },
    { id: 4, sdg: 'SDG 4 优质教育', name: '星火助学社', activity: '社区青少年公益课业辅导活动', mbti: 'INFJ', slogan: '以知为炬，点亮希望，让每个梦想都能向阳而生' },
    { id: 5, sdg: 'SDG 5 性别平等', name: '平权赋能青年社', activity: '性别平等主题校园宣讲活动', mbti: 'ENTP', slogan: '打破偏见，共筑平等，无差别绽放每一份力量' },
    { id: 6, sdg: 'SDG 6 清洁饮水和卫生设施', name: '清源守护社', activity: '校园节水知识科普与水质检测活动', mbti: 'ISTJ', slogan: '科学护水，点滴节约，守护生命之源永续流淌' },
    { id: 7, sdg: 'SDG 7 经济适用的清洁能源', name: '绿能创新社', activity: '太阳能简易装置手工制作工坊', mbti: 'INTJ', slogan: '科创赋能绿能，智享低碳未来，解锁清洁能源新可能' },
    { id: 8, sdg: 'SDG 8 体面工作和经济增长', name: '青年职创社', activity: '绿色职业发展规划分享沙龙', mbti: 'ENTJ', slogan: '锚定绿色赛道，规划职业蓝图，以实干奔赴高质量成长' },
    { id: 9, sdg: 'SDG 9 产业、创新和基础设施', name: '科创筑梦社', activity: '废旧零件创意科创制作赛', mbti: 'INTP', slogan: '拆解旧物，重构新意，以科创之力筑造可持续未来' },
    { id: 10, sdg: 'SDG 10 减少不平等', name: '融和互助社', activity: '校园无障碍环境体验&残障伙伴联谊活动', mbti: 'ESFP', slogan: '打破隔阂，暖心相融，让平等与包容洒满每个角落' },
    { id: 11, sdg: 'SDG 11 可持续城市和社区', name: '宜居社区营造社', activity: '社区楼道绿色美化志愿行动', mbti: 'ISFP', slogan: '以美润心，以绿筑家，共绘宜居社区新画卷' },
    { id: 12, sdg: 'SDG 12 负责任消费和生产', name: '绿色生活践行社', activity: '校园可持续跳蚤市场活动', mbti: 'ESTP', slogan: '好物流转，循环焕新，让消费更有温度与担当' },
    { id: 13, sdg: 'SDG 13 气候行动', name: '青禾气候行动社', activity: '校园碳足迹测算&气候科普活动', mbti: 'INFP', slogan: '感知气候脉动，践行低碳小事，守护我们共同的家园' },
    { id: 14, sdg: 'SDG 14 水下生物', name: '蔚蓝守护社', activity: '海洋生物保护主题科普展览活动', mbti: 'ENFP', slogan: '探秘蔚蓝深海，守护水下生灵，让海洋永远澄澈鲜活' },
    { id: 15, sdg: 'SDG 15 陆地生物', name: '山林守护社', activity: '近郊山林垃圾清理&植物保护志愿行', mbti: 'ESTJ', slogan: '清理山林垃圾，守护草木生灵，筑牢陆地生态安全线' },
    { id: 16, sdg: 'SDG 16 和平、正义与强大机构', name: '青年法治践行社', activity: '校园普法知识趣味竞赛', mbti: 'ISFP', slogan: '以法为盾，守护和平，让正义之光照亮青春之路' },
    { id: 17, sdg: 'SDG 17 促进目标实现的伙伴关系', name: '益启协作社', activity: '高校跨社团可持续项目对接会', mbti: 'ENFP', slogan: '携手同行，聚力协作，共赴可持续发展新征程' }
];

function getClubs() {
    return currentLang === 'zh' ? clubs_zh : clubs_en;
}

// ===================== 关卡模板（英文） =====================
const templates_en = {
    "1": [
        {
            "title": "Question 1",
            "description": "The club will hold a \"Warm Winter Love Week\" mobilization meeting.",
            "choices": [
                {
                    "text": "Stand on the stage and make impassioned speeches to mobilize the atmosphere of the audience.",
                    "trait": "E"
                },
                {
                    "text": "Responsible for distributing materials and observing everyone's reactions in the corner",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 2",
            "description": "Organize old books collected from donations.",
            "choices": [
                {
                    "text": "Check each book carefully for creases, notes or damage",
                    "trait": "S"
                },
                {
                    "text": "Think about how these books will open the eyes of children in remote areas",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 3",
            "description": "A classmate missed the donation time and cried to make up for the donation.",
            "choices": [
                {
                    "text": "Tell him that the system is closed and the rules must be followed to facilitate later statistics.",
                    "trait": "T"
                },
                {
                    "text": "I made an exception and helped him contact the warehouse. I couldn't bear to refuse this kindness.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 4",
            "description": "Prepare to conduct community research.",
            "choices": [
                {
                    "text": "Plan every step of the route in advance, down to the exact time of departure",
                    "trait": "J"
                },
                {
                    "text": "Just decide on the meeting point and explore the rest as you walk.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 5",
            "description": "Discuss poverty alleviation programs.",
            "choices": [
                {
                    "text": "Focus on how to increase the amount of money you raise",
                    "trait": "S"
                },
                {
                    "text": "Focus on how to fundamentally change the way poor people think",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 6",
            "description": "The promotional booth was crowded with people.",
            "choices": [
                {
                    "text": "Talk to everyone excitedly",
                    "trait": "E"
                },
                {
                    "text": "I feel like my energy is being depleted very quickly and I want to go back to the office and take a rest.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 7",
            "description": "I saw a mistake was made when members distributed supplies.",
            "choices": [
                {
                    "text": "Strictly point out process errors and require immediate correction",
                    "trait": "T"
                },
                {
                    "text": "Gently comfort the member and calm him down first before solving the problem",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 8",
            "description": "Dispose of expired donated food.",
            "choices": [
                {
                    "text": "Dispose of directly according to regulations",
                    "trait": "J"
                },
                {
                    "text": "Thinking about whether we can contact the farm to make organic fertilizer",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 9",
            "description": "Conceive a slogan.",
            "choices": [
                {
                    "text": "Prefer to use hard facts like \"100,000 yuan has been raised\"",
                    "trait": "S"
                },
                {
                    "text": "Tends to use the literary metaphor of \"lighting up the light of life\"",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 10",
            "description": "Interview for new recruits to the club.",
            "choices": [
                {
                    "text": "I like social masters who are cheerful and well-spoken.",
                    "trait": "E"
                },
                {
                    "text": "A doer who likes to be calm and reserved, focused on work",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 11",
            "description": "The event cost overrun.",
            "choices": [
                {
                    "text": "Get out your calculator and cut down on your next expenses wisely",
                    "trait": "T"
                },
                {
                    "text": "Worried that spending cuts will affect the mood of recipients, and feel conflicted",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 12",
            "description": "Write a summary of the activity.",
            "choices": [
                {
                    "text": "Report the results item by item according to the logical framework",
                    "trait": "J"
                },
                {
                    "text": "I randomly recorded my thoughts and even added a few doodles.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 13",
            "description": "Social reporting on the current situation of poverty.",
            "choices": [
                {
                    "text": "Focus on specific poverty rates and geographic distribution",
                    "trait": "S"
                },
                {
                    "text": "Thinking about fairness, justice and philosophical propositions behind the report",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 14",
            "description": "Volunteers temporarily release pigeons.",
            "choices": [
                {
                    "text": "Feeling very angry and feeling that there is an extreme lack of responsibility",
                    "trait": "T"
                },
                {
                    "text": "I'm worried that the other party may have had an accident and want to ask",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 15",
            "description": "Plan activities for next semester.",
            "choices": [
                {
                    "text": "Follow this year's successful template and seek stability",
                    "trait": "J"
                },
                {
                    "text": "Even if the old plan is good, I still want to tear it down and start over with an innovative one.",
                    "trait": "P"
                }
            ]
        }
    ],
    "2": [
        {
            "title": "Question 1",
            "description": "Observe the \"CD\" situation in the cafeteria.",
            "choices": [
                {
                    "text": "Take the initiative to ask students who haven't finished eating the reason",
                    "trait": "E"
                },
                {
                    "text": "Silently count plates and record data from a distance",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 2",
            "description": "Explain the science of leftover food.",
            "choices": [
                {
                    "text": "A detailed explanation of the amount of methane produced by food decay",
                    "trait": "S"
                },
                {
                    "text": "Describing waste as a sort of plunder of the planet's future",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 3",
            "description": "Handle minor conflicts within the club.",
            "choices": [
                {
                    "text": "Negotiate openly and honestly, and apologize to whoever made the mistake",
                    "trait": "T"
                },
                {
                    "text": "Promote peace in private to avoid face-to-face conflicts",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 4",
            "description": "Prepare for tomorrow's check-in event.",
            "choices": [
                {
                    "text": "Check whether the punch-in seal, red ink pad, and registration form are complete",
                    "trait": "S"
                },
                {
                    "text": "Imagine the touching scene of everyone's enthusiastic participation at the event",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 5",
            "description": "Write warning cards to students who are wasteful.",
            "choices": [
                {
                    "text": "Tough tone: Waste is shameful, please respect yourself",
                    "trait": "T"
                },
                {
                    "text": "Gentle tone: One meter and one millet are hard-earned",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 6",
            "description": "Society meeting.",
            "choices": [
                {
                    "text": "Speak enthusiastically and don't let the silence pass",
                    "trait": "E"
                },
                {
                    "text": "Only speak when called upon",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 7",
            "description": "Develop food-saving regulations.",
            "choices": [
                {
                    "text": "Everyone is required to strictly abide by it and leave no blind spots.",
                    "trait": "J"
                },
                {
                    "text": "I think there should be some room for flexibility, for example if you are sick and have no appetite.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 8",
            "description": "Concept creative poster.",
            "choices": [
                {
                    "text": "Draw a concrete cracked rice bowl",
                    "trait": "S"
                },
                {
                    "text": "Use abstract lines to express the sense of resource depletion",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 9",
            "description": "Found the partner to be unreliable.",
            "choices": [
                {
                    "text": "Directly terminate cooperation in accordance with the terms of the agreement",
                    "trait": "T"
                },
                {
                    "text": "I feel that the other party is also having difficulties, so give me another chance.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 10",
            "description": "Preparation before the event.",
            "choices": [
                {
                    "text": "All inspections must be completed before 10 o'clock tonight",
                    "trait": "J"
                },
                {
                    "text": "I think it's too late to get up early tomorrow and finish it in half an hour.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 11",
            "description": "Social media promotion.",
            "choices": [
                {
                    "text": "Launch a school-wide video challenge",
                    "trait": "E"
                },
                {
                    "text": "Write in-depth articles that resonate",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 12",
            "description": "Evaluate a food-saving idea.",
            "choices": [
                {
                    "text": "Let's first see if it can save money.",
                    "trait": "T"
                },
                {
                    "text": "Let's first see if it can warm people's hearts",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Question 13",
            "description": "Facing a chaotic warehouse.",
            "choices": [
                {
                    "text": "Start sorting and labeling immediately",
                    "trait": "J"
                },
                {
                    "text": "It doesn't matter if it's a bit messy, as long as you can find something",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 14",
            "description": "Imagine the future of agriculture.",
            "choices": [
                {
                    "text": "Fully automated machinery and precise spraying",
                    "trait": "S"
                },
                {
                    "text": "An utopia where humans and the land coexist harmoniously",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 15",
            "description": "Faced with unexpected media interviews.",
            "choices": [
                {
                    "text": "talk excitedly",
                    "trait": "E"
                },
                {
                    "text": "I feel nervous and hope the president will contact me",
                    "trait": "I"
                }
            ]
        }
    ],
    "3": [
        {
            "title": "Question 1",
            "description": "Organize a psychological counseling group.",
            "choices": [
                {
                    "text": "Guide everyone to play icebreaker games to break the silence",
                    "trait": "E"
                },
                {
                    "text": "Give everyone some time for quiet meditation",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 2",
            "description": "Describe the state of health.",
            "choices": [
                {
                    "text": "Indicators are normal, no cold or fever",
                    "trait": "S"
                },
                {
                    "text": "Full of soul, full of desire for life",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 3",
            "description": "Someone in the group cried.",
            "choices": [
                {
                    "text": "Pass the tissue and listen silently",
                    "trait": "F"
                },
                {
                    "text": "Analyze the reasons for his crying and give professional advice",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "Question 4",
            "description": "Plan a sports check-in week.",
            "choices": [
                {
                    "text": "It is stipulated to run 3 kilometers every day, even if it is less than one meter",
                    "trait": "J"
                },
                {
                    "text": "As long as there is exercise, there is no limit to the type",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 5",
            "description": "Face the requests of others.",
            "choices": [
                {
                    "text": "It's always hard to say \"no\" for fear of hurting feelings",
                    "trait": "F"
                },
                {
                    "text": "If you think it's unreasonable, just reject it decisively.",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "Question 6",
            "description": "Prepare PPT for popular science lectures.",
            "choices": [
                {
                    "text": "Citing the latest medical journal data",
                    "trait": "S"
                },
                {
                    "text": "Explore the life philosophy of physical and mental balance",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 7",
            "description": "The layout of the event site.",
            "choices": [
                {
                    "text": "Restore strictly according to the sketch, the position is not offset by one millimeter",
                    "trait": "J"
                },
                {
                    "text": "Put it wherever you feel it looks good.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 8",
            "description": "Ask classmates about emotional problems.",
            "choices": [
                {
                    "text": "Give him absolute emotional support",
                    "trait": "F"
                },
                {
                    "text": "Help him clarify his logic and find out the source of his troubles",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "Question 9",
            "description": "The club recruits new members.",
            "choices": [
                {
                    "text": "Go to the stage and interact with the freshmen up close",
                    "trait": "E"
                },
                {
                    "text": "Standing behind the podium and reading the manuscript in an orderly manner",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 10",
            "description": "Worked all day.",
            "choices": [
                {
                    "text": "I want to go to a dinner party to share today's anecdotes",
                    "trait": "E"
                },
                {
                    "text": "I want to go home, take a hot bath, and turn off my phone",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Question 11",
            "description": "Think about community development.",
            "choices": [
                {
                    "text": "Consider how many members to add next month",
                    "trait": "S"
                },
                {
                    "text": "Consider how to change stigma against mental health problems in schools",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 12",
            "description": "Handle members' mistakes.",
            "choices": [
                {
                    "text": "If you feel that criticism will damage the team atmosphere, choose tolerance",
                    "trait": "F"
                },
                {
                    "text": "Believes that responsibilities and rights should be clarified to avoid recurrence",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "Question 13",
            "description": "Face deadlines.",
            "choices": [
                {
                    "text": "Finish it days in advance and enjoy your free time",
                    "trait": "J"
                },
                {
                    "text": "Enjoy the thrill of last minute sprint",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Question 14",
            "description": "Introducing the prevention of myopia.",
            "choices": [
                {
                    "text": "Talk about specific techniques and lighting requirements",
                    "trait": "S"
                },
                {
                    "text": "It is said that eyes are the windows to the world",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Question 15",
            "description": "Seeing that the members are in poor condition.",
            "choices": [
                {
                    "text": "Ask him about trivial matters in his life with concern",
                    "trait": "F"
                },
                {
                    "text": "Remind him not to let personal emotions affect his progress",
                    "trait": "T"
                }
            ]
        }
    ],
    "4": [
        {
            "title": "Teaching Style E/I",
            "description": "If you were asked to teach a lesson to the younger brothers and sisters in the lower grades.",
            "choices": [
                {
                    "text": "I like to design many interactive games and help everyone learn while playing.",
                    "trait": "E"
                },
                {
                    "text": "Likes to tell stories quietly and guide everyone to think",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Learning Points S/N",
            "description": "Listen to the teacher teach a brand new science lesson.",
            "choices": [
                {
                    "text": "Pay attention to the specific experimental steps and the last observed phenomenon",
                    "trait": "S"
                },
                {
                    "text": "Pay attention to what new things this scientific principle can be used to invent",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Homework Evaluation T/F",
            "description": "Your good friend didn't finish his homework and was criticized by the teacher.",
            "choices": [
                {
                    "text": "I think the teacher did the right thing and if he doesn't do his homework, he should be educated",
                    "trait": "T"
                },
                {
                    "text": "I feel that the teacher is too cruel and I am worried that my good friends will hate this class because of it.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Study Plan J/P",
            "description": "Facing the big test next week.",
            "choices": [
                {
                    "text": "Review two units every day and strictly follow the schedule",
                    "trait": "J"
                },
                {
                    "text": "I feel most motivated the night before the exam, so I study all night",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Extracurricular extension S/N",
            "description": "Saw a book about \"School of the Future\".",
            "choices": [
                {
                    "text": "Pay attention to what kind of smart tables and chairs will be in the classroom of the future",
                    "trait": "S"
                },
                {
                    "text": "Thinking about whether teachers and examinations will still be needed in future education",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Classroom Performance E/I",
            "description": "The teacher asked the whole class a difficult question.",
            "choices": [
                {
                    "text": "Raise your hands immediately and tell your answer while thinking about it",
                    "trait": "E"
                },
                {
                    "text": "Write down your ideas on a scratch paper first, make sure you are right, and then raise your hand",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Correction mentality T/F",
            "description": "The teacher corrected one of your questions incorrectly, but you were actually right.",
            "choices": [
                {
                    "text": "After class, I went directly to the teacher to argue and asked to change my scores back.",
                    "trait": "T"
                },
                {
                    "text": "Hesitant to find a teacher because he is afraid that the teacher will be embarrassed or think that he is too fussy.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task deadline J/P",
            "description": "The teacher requires a handwritten newspaper to be handed in on Friday.",
            "choices": [
                {
                    "text": "I finished it on Wednesday and even added a few more decorations",
                    "trait": "J"
                },
                {
                    "text": "I was still busy tinkering with colors in my morning reading class on Friday, and I handed it in before it was even dry.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic preferences S/N",
            "description": "Your ideal library:",
            "choices": [
                {
                    "text": "The bookshelf is very neat and each category is clearly labeled.",
                    "trait": "S"
                },
                {
                    "text": "The decoration is very artistic and there are many weird reading corners.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Cooperation tendency T/F",
            "description": "Work in groups to complete a handmade model.",
            "choices": [
                {
                    "text": "Choose the team leader who has the best craftsmanship and can lead everyone to get high scores.",
                    "trait": "T"
                },
                {
                    "text": "Choose the team leader who has the best temper and can make everyone have fun",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Reading Habits S/N",
            "description": "Read historical story books.",
            "choices": [
                {
                    "text": "Remember the specific year of each dynasty and the names of famous generals",
                    "trait": "S"
                },
                {
                    "text": "Think about what would happen now if history had changed at some point",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Execution Style J/P",
            "description": "Participate in the club's volunteer teaching preparation meeting.",
            "choices": [
                {
                    "text": "You must bring a notebook and write down all key tasks",
                    "trait": "J"
                },
                {
                    "text": "I think it's enough to just listen to it and then use it according to the actual situation.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Social Energy E/I",
            "description": "Participate in school-wide learning sharing sessions.",
            "choices": [
                {
                    "text": "Actively seek out top students from other classes to exchange experiences and contact information",
                    "trait": "E"
                },
                {
                    "text": "Sitting in the corner, after listening, I silently sorted out my notes and returned to class.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Feedback requirements T/F",
            "description": "The teacher's comments to you:",
            "choices": [
                {
                    "text": "\"Your logic is very strict and your learning methods are very scientific\"",
                    "trait": "T"
                },
                {
                    "text": "\"You are a very caring child, always helping your classmates\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Future plans J/P",
            "description": "About the interest classes next semester.",
            "choices": [
                {
                    "text": "I have already made my choice and checked the class schedule.",
                    "trait": "J"
                },
                {
                    "text": "Wait until school starts to see what everyone chooses, or just wait and see what your mood is then.",
                    "trait": "P"
                }
            ]
        }
    ],
    "5": [
        {
            "title": "Social Role E/I",
            "description": "Organize campus lectures on \"Opposing Gender Bias\".",
            "choices": [
                {
                    "text": "Stand under the national flag and give a speech, issuing an initiative to all students in the school",
                    "trait": "E"
                },
                {
                    "text": "Responsible for putting up posters on the publicity board or playing the sound system in the background",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Observation angle S/N",
            "description": "I saw girls playing football and boys jumping rubber bands on the playground.",
            "choices": [
                {
                    "text": "I think this scene is very novel, and I will observe whether they play smoothly or not.",
                    "trait": "S"
                },
                {
                    "text": "It makes sense to think that this is the best example of \"breaking prejudice\"",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Conflict handling T/F",
            "description": "The boys and girls in the class had a quarrel over the uneven division of cleaning duties.",
            "choices": [
                {
                    "text": "Take out a table and calculate the fairest distribution based on the number of people and workload",
                    "trait": "T"
                },
                {
                    "text": "I advise everyone to understand each other. Boys should do more physical work and girls should be responsible for more detailed work.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Activity Habits J/P",
            "description": "Planning the club's \"small theater for gender equality\".",
            "choices": [
                {
                    "text": "The script must be written down first, and everyone must memorize the lines before rehearsing.",
                    "trait": "J"
                },
                {
                    "text": "There is only one outline, let everyone improvise on the spot to see who has the best imagination",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Vision Logic S/N",
            "description": "Talking about \"future society\".",
            "choices": [
                {
                    "text": "Pay attention to whether the male to female ratio in each position can reach 1:1",
                    "trait": "S"
                },
                {
                    "text": "Looking forward to a free world where no one is defined by gender",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Interactive style E/I",
            "description": "Participate in the \"Equality Youth Forum\".",
            "choices": [
                {
                    "text": "Keep asking questions and try to convince those who disagree with your point of view",
                    "trait": "E"
                },
                {
                    "text": "Listen quietly and refine your expression only when asked to share",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Correction mentality T/F",
            "description": "The teacher said, \"Boys are not allowed to cry and must be strong.\"",
            "choices": [
                {
                    "text": "I don't think this is logically correct. It has been scientifically proven that boys also have emotional needs.",
                    "trait": "T"
                },
                {
                    "text": "I feel that these words hurt the crybaby boy's heart, and I feel sour in my heart.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "The president asked to finish writing the promotional tweets this weekend.",
            "choices": [
                {
                    "text": "I sent it to the president for review on Saturday morning.",
                    "trait": "J"
                },
                {
                    "text": "I'm still working on the manuscript at 11pm on Sunday because I'm always looking for inspiration.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic preferences S/N",
            "description": "Make a \"Gender Equality\" badge.",
            "choices": [
                {
                    "text": "Use half red and blue patterns to represent equality between men and women",
                    "trait": "S"
                },
                {
                    "text": "Breaking the shackles with a graphic symbol of breaking out of the shell",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Evaluation criteria T/F",
            "description": "Select a club spokesperson.",
            "choices": [
                {
                    "text": "See who has good eloquence, quick response and clear thinking",
                    "trait": "T"
                },
                {
                    "text": "See who has a gentle personality and can take care of the feelings of different groups",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Study Habits S/N",
            "description": "Read biographies about Florence Nightingale or Marie Curie.",
            "choices": [
                {
                    "text": "Pay attention to every detail and difficulty they face in the laboratory",
                    "trait": "S"
                },
                {
                    "text": "Think about how they, as women, challenged tradition in that era",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Contingency style J/P",
            "description": "The guest for the scheduled \"Gender Equality\" lecture was late.",
            "choices": [
                {
                    "text": "I felt very embarrassed and kept looking at my watch, feeling that the activity was about to be ruined.",
                    "trait": "J"
                },
                {
                    "text": "I think it doesn't matter, let's play some interactive games to save the day.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "Would like to invite the principal to your event.",
            "choices": [
                {
                    "text": "Take the club members directly to the principal's office and sincerely invite them face to face",
                    "trait": "E"
                },
                {
                    "text": "Write a letter carefully and put it in the principal's suggestion mailbox.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Feedback requirements T/F",
            "description": "What your classmates say about you:",
            "choices": [
                {
                    "text": "\"You are a reasonable, principled and sensible person\"",
                    "trait": "T"
                },
                {
                    "text": "\"You are a very considerate, kind and warm person\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Perception of achievement J/P",
            "description": "Seeing that the event ended successfully, the garbage was also cleaned up.",
            "choices": [
                {
                    "text": "I feel very satisfied, all the processes are in order, and I feel very comfortable.",
                    "trait": "J"
                },
                {
                    "text": "I feel like I still have more to say and want to plan another more exciting event right away",
                    "trait": "P"
                }
            ]
        }
    ],
    "6": [
        {
            "title": "Experimental attitude S/N",
            "description": "Water quality at various locations on campus is tested in the laboratory.",
            "choices": [
                {
                    "text": "Strictly record the depth of color change of the test paper and compare it with the standard color comparison card",
                    "trait": "S"
                },
                {
                    "text": "Think about how it will improve everyone's health if the water quality of the whole school is improved.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Expression E/I",
            "description": "Responsible for the \"Water Saving Knowledge\" game.",
            "choices": [
                {
                    "text": "Warmly greet the students at the checkpoint: \"Come and pass the checkpoint to get the prize!\"",
                    "trait": "E"
                },
                {
                    "text": "Responsible for registering winners and distributing gifts, doesn't talk much",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Conflict Decision Making T/F",
            "description": "My classmates were playing with water in the water room, making the floor very wet and slippery.",
            "choices": [
                {
                    "text": "Stop it immediately and notify the teacher, believing that safety regulations are the most important",
                    "trait": "T"
                },
                {
                    "text": "Go over and remind them not to slip and help them dry up the water",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Planned J/P",
            "description": "Plan the \"campus toilet hygiene renovation\" plan.",
            "choices": [
                {
                    "text": "Develop a detailed shift schedule, clearly stating who is responsible for which floor",
                    "trait": "J"
                },
                {
                    "text": "I tell everyone to paint the walls, put up stickers, and beautify them casually when you have time.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Vision Logic S/N",
            "description": "Saw the news about \"water shortage in drought areas\".",
            "choices": [
                {
                    "text": "Pay attention to how many liters of water each person in that area can drink per day",
                    "trait": "S"
                },
                {
                    "text": "Thinking about how human civilization will continue if global water resources are exhausted",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Interactive style E/I",
            "description": "Participate in the environmental protection exchange meeting for middle school students in the district.",
            "choices": [
                {
                    "text": "Actively take the stage to introduce your club's water-saving experience",
                    "trait": "E"
                },
                {
                    "text": "Listen silently to other people's experiences in the audience and write them down in a small notebook",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Error correction logic T/F",
            "description": "The team members wrote an extra zero when counting the water meter readings.",
            "choices": [
                {
                    "text": "He must be asked to retest on the spot. The data must be true and cannot be falsified.",
                    "trait": "T"
                },
                {
                    "text": "I don't think it's okay. If you write more, it will show that everyone has a heavy task of saving water.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Prepare your \"Waterkeeper\" journal for this semester.",
            "choices": [
                {
                    "text": "Keep recording every day, even if it's just one sentence",
                    "trait": "J"
                },
                {
                    "text": "Save until the end of the week and then make up for it all at once",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic preferences S/N",
            "description": "Design water conservation posters.",
            "choices": [
                {
                    "text": "Draw a realistic picture of a faucet that is not closed tightly and is dripping.",
                    "trait": "S"
                },
                {
                    "text": "Draw a phoenix flying in the sea, symbolizing the source of life",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Evaluation criteria T/F",
            "description": "Evaluate whether a water-saving activity is good or not.",
            "choices": [
                {
                    "text": "See how much the school's water bill dropped this month.",
                    "trait": "T"
                },
                {
                    "text": "Let's see if the students are more aware of saving water when washing their hands.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Study Habits S/N",
            "description": "Learn the principles of the water cycle.",
            "choices": [
                {
                    "text": "First, memorize the specific definitions of evaporation, precipitation, and surface runoff.",
                    "trait": "S"
                },
                {
                    "text": "Think about how water flows between the earth, the atmosphere, and life",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Contingency style J/P",
            "description": "The prepared leaflets got wet on the way.",
            "choices": [
                {
                    "text": "I feel so crazy, I feel like today's activities are ruined",
                    "trait": "J"
                },
                {
                    "text": "I don't think it matters. By the way, it can also be used as a negative teaching material to talk about the role of water.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "I want to convince the logistics man to install sensor faucets in the toilet.",
            "choices": [
                {
                    "text": "I go to the uncle's office every day and grind until the uncle agrees.",
                    "trait": "E"
                },
                {
                    "text": "Compile a comparative data on how much money can be saved by saving water and send it to the logistics department",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Feedback requirements T/F",
            "description": "After being named a \"little water-saving guardian\", the teacher praised you:",
            "choices": [
                {
                    "text": "\"You are very rigorous in your work and handle every aspect very well.\"",
                    "trait": "T"
                },
                {
                    "text": "\"You have a strong sense of social responsibility and are a child full of justice.\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Pursuit of ideals J/P",
            "description": "About the future goals of the society.",
            "choices": [
                {
                    "text": "We hope to replace all faucets in the school with water-saving ones within 3 years.",
                    "trait": "J"
                },
                {
                    "text": "Hope to hold an unprecedented \"Water Culture and Art Festival\" in the school",
                    "trait": "P"
                }
            ]
        }
    ],
    "7": [
        {
            "title": "Experimental details S/N",
            "description": "In the \"Solar Car\" workshop, you find that the instruction manual is missing a page.",
            "choices": [
                {
                    "text": "Search through the wastebasket to find that page and assemble it in precise steps",
                    "trait": "S"
                },
                {
                    "text": "Observe the existing parts and intuitively guess the missing power connection logic",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Energy E/I",
            "description": "The club will set up a stall to display \"hand-cranked lanterns\" at the school gate.",
            "choices": [
                {
                    "text": "Standing in the middle of the road, he shouted to recruit students: \"Come and give it a try and generate your own electricity!\"",
                    "trait": "E"
                },
                {
                    "text": "Responsible for debugging equipment in the back row, and patiently answer when someone approaches and asks.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Values ​​T/F",
            "description": "When reviewing a green energy idea, one of the solutions is very environmentally friendly but extremely difficult to produce.",
            "choices": [
                {
                    "text": "Calmly analyze its input-output ratio, believe it is not feasible, and recommend that it be killed.",
                    "trait": "T"
                },
                {
                    "text": "Impressed by the player's enthusiasm and original intention, he tried to find ways to help him streamline his plan.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Planned J/P",
            "description": "Get ready for next week's Green Energy Lab Open Day.",
            "choices": [
                {
                    "text": "The guided tour route, commentary and number of visitors for each group will be decided this Friday.",
                    "trait": "J"
                },
                {
                    "text": "When the time comes, we will decide how many people we will show you on the tour.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Vision Logic S/N",
            "description": "When discussing the \"peak carbon\" goal.",
            "choices": [
                {
                    "text": "Pay attention to how many kilowatt hours of electricity can be saved by air conditioners in school dormitories every night",
                    "trait": "S"
                },
                {
                    "text": "Discuss the macro layout of China's energy structure transformation in 2030",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Interactive style E/I",
            "description": "Participate in the Green Energy Forum of Universities across the province.",
            "choices": [
                {
                    "text": "Actively join various discussion groups, exchange contact information and expand your network",
                    "trait": "E"
                },
                {
                    "text": "Sit in the last row and carefully record the ideas that inspire you",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Error correction logic T/F",
            "description": "A teammate was careless when connecting the circuit, causing it to trip.",
            "choices": [
                {
                    "text": "Seriously pointed out his illegal operation and asked him to re-read the safety manual",
                    "trait": "T"
                },
                {
                    "text": "First comfort the frightened teammate, and then laugh together to troubleshoot the problem",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Write a popular science paper on \"Hydrogen Energy\".",
            "choices": [
                {
                    "text": "Write 500 words every day, it's unstoppable, and finish it three days in advance",
                    "trait": "J"
                },
                {
                    "text": "Collect a large amount of materials first, and then wait until the night when inspiration strikes to complete it in one go",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic preferences S/N",
            "description": "Design community logo.",
            "choices": [
                {
                    "text": "Must contain specific green energy elements such as lightning and leaves",
                    "trait": "S"
                },
                {
                    "text": "Tends towards simple line combinations, symbolizing infinite circulation of energy",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Decision basis T/F",
            "description": "The club needs to elect a new president.",
            "choices": [
                {
                    "text": "See who has the highest scores in science and technology innovation competitions and the strongest management skills",
                    "trait": "T"
                },
                {
                    "text": "See who is the most popular in the club and cares about everyone's feelings the most",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Study Habits S/N",
            "description": "Learn the principles of nuclear energy.",
            "choices": [
                {
                    "text": "First remember the structure of a nuclear reactor and the names of each part",
                    "trait": "S"
                },
                {
                    "text": "First understand the profound scientific logic behind the mass-energy equation $E=mc^2$",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Contingency style J/P",
            "description": "The demonstration experiment equipment suddenly broke.",
            "choices": [
                {
                    "text": "I feel dizzy and think it is a serious dereliction of duty not to check in place.",
                    "trait": "J"
                },
                {
                    "text": "Thinking it was a minor accident, I impromptuly explained the principles of the equipment to the audience.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "I want to invite a teacher to give guidance.",
            "choices": [
                {
                    "text": "Rush directly into the office and express your ideas sincerely face to face",
                    "trait": "E"
                },
                {
                    "text": "Repeatedly revise the email and explain the cooperation plan through text",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Competitive mentality T/F",
            "description": "Participated in energy saving competition and lost to opponent.",
            "choices": [
                {
                    "text": "Study your opponent's plan and acknowledge the opponent's logical and technical lead",
                    "trait": "T"
                },
                {
                    "text": "I feel that my team's cooperation is very warm, even though they lost, it's an honor",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Feedback requirements E/I",
            "description": "After winning the \"Green Energy Pioneer Award\".",
            "choices": [
                {
                    "text": "Post pictures in the circle of friends and reply to every like and comment",
                    "trait": "E"
                },
                {
                    "text": "Silently put the trophy away in the bookcase and gain a peaceful sense of accomplishment.",
                    "trait": "I"
                }
            ]
        }
    ],
    "8": [
        {
            "title": "Simulated workplace E/I",
            "description": "In a simulated campus recruitment site, you are responsible for the sign-in office.",
            "choices": [
                {
                    "text": "Warmly welcome every senior and sister and take the initiative to start a conversation",
                    "trait": "E"
                },
                {
                    "text": "Check the list carefully, nod politely, and don't talk nonsense.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Career Analysis S/N",
            "description": "Evaluate whether an internship is good or not.",
            "choices": [
                {
                    "text": "Look at whether the salary is high, whether the lunch is delicious, and whether it is close to the school.",
                    "trait": "S"
                },
                {
                    "text": "Check whether this job has room for promotion and whether it meets your future ideals",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Stress response T/F",
            "description": "The team members secretly cried in the office because they failed in the internship interview.",
            "choices": [
                {
                    "text": "Pass her a tissue and rationally analyze the technical reasons for her failure.",
                    "trait": "T"
                },
                {
                    "text": "Complain to the interviewer with her and comfort her, \"That company is not worthy of you.\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Schedule Habits J/P",
            "description": "Responsible for calculating class schedules of all members of the club to arrange classes.",
            "choices": [
                {
                    "text": "Make a beautiful form and ask everyone to fill it out before Wednesday",
                    "trait": "J"
                },
                {
                    "text": "I don't think it's necessary. Just yell in the group before each event to see who is available.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Economic Perspective S/N",
            "description": "Discuss the \"slash youth\" phenomenon.",
            "choices": [
                {
                    "text": "Watch how they balance the income and physical exertion of multiple jobs",
                    "trait": "S"
                },
                {
                    "text": "Explore the changes this diversified employment model will bring to the future social structure",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Team Role E/I",
            "description": "Panel discussion on \"Entrepreneurship among College Students\".",
            "choices": [
                {
                    "text": "Constantly output opinions and dominate the entire discussion rhythm",
                    "trait": "E"
                },
                {
                    "text": "Silently record everyone's words, and finally put forward core corrections",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Dispute handling T/F",
            "description": "Some people question the uneven distribution of community funds.",
            "choices": [
                {
                    "text": "Present clear Excel bills and directly respond to doubts with data",
                    "trait": "T"
                },
                {
                    "text": "Organize everyone to have dinner and talk to resolve the \"sense of grievance\" in the hearts of members",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task deadline J/P",
            "description": "There is 1 hour left until submission of business plan.",
            "choices": [
                {
                    "text": "I paid it a long time ago, and now I am drinking milk tea leisurely",
                    "trait": "J"
                },
                {
                    "text": "Still crazily modifying the background color of PPT and enjoying the adrenaline rush",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Career Ideal S/N",
            "description": "Your future picture is:",
            "choices": [
                {
                    "text": "Have a stable, high-paying, and clear position in a well-known company",
                    "trait": "S"
                },
                {
                    "text": "Create an industry that has never existed before and be the first to try it",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Evaluation feedback T/F",
            "description": "The president evaluates your work.",
            "choices": [
                {
                    "text": "\"Your data analysis is very objective and logical\"",
                    "trait": "T"
                },
                {
                    "text": "\"You were a great team player in this project and warmed everyone's heart\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Management style J/P",
            "description": "If you are the president of a professional entrepreneurial society.",
            "choices": [
                {
                    "text": "Regular meetings must be held every week to report progress of each department",
                    "trait": "J"
                },
                {
                    "text": "There are no meetings unless there is anything important, everyone can be contacted online at any time, and the degree of freedom is extremely high",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Sociability E/I",
            "description": "Evening career planning lecture.",
            "choices": [
                {
                    "text": "You must sit in the first row. After the show is over, rush up and add the lecturer on WeChat.",
                    "trait": "E"
                },
                {
                    "text": "Sit in the last row, write down the key points and immediately retreat to the dormitory",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Thought Pattern S/N",
            "description": "Learn the principles of economics.",
            "choices": [
                {
                    "text": "I like to study specific cases, such as why a certain milk tea shop closed down",
                    "trait": "S"
                },
                {
                    "text": "Like to derive macro models, such as the mathematical curve of supply and demand balance",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Incentive method T/F",
            "description": "Reward outstanding members.",
            "choices": [
                {
                    "text": "Issue a certificate of honor with quantitative ranking",
                    "trait": "T"
                },
                {
                    "text": "A letter of thanks for his hard work",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Action Logic J/P",
            "description": "Facing new community challenges.",
            "choices": [
                {
                    "text": "First collect the information from the previous three sessions and play out the cards according to the routine.",
                    "trait": "J"
                },
                {
                    "text": "Just get started and solve problems temporarily if you encounter them",
                    "trait": "P"
                }
            ]
        }
    ],
    "9": [
        {
            "title": "Dismantling Instinct S/N",
            "description": "Saw a scrapped 3D printer in the lab.",
            "choices": [
                {
                    "text": "I want to take it apart and see how the drive belt and motor are connected.",
                    "trait": "S"
                },
                {
                    "text": "Think about whether its working principle can be applied to future construction",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Status E/I",
            "description": "Organize a \"Creative Assembly Competition of Used Parts\".",
            "choices": [
                {
                    "text": "Wander between the groups and comment on each imaginative work.",
                    "trait": "E"
                },
                {
                    "text": "Immerse yourself in your own little world and try to build a complex robotic arm",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Conflict Decision Making T/F",
            "description": "The two team members had a dispute over the technical route.",
            "choices": [
                {
                    "text": "Let them each write a logical derivation and use facts to prove who is right",
                    "trait": "T"
                },
                {
                    "text": "I advise everyone to take a step back and integrate the two people's plans.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Time Management J/P",
            "description": "Develop the club's \"material borrowing applet\".",
            "choices": [
                {
                    "text": "Strictly divide UI design, front-end, and back-end, and check the progress every day",
                    "trait": "J"
                },
                {
                    "text": "Write code casually, wherever you write it, and the functions will be gradually completed.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic Orientation S/N",
            "description": "Evaluate a scientific work.",
            "choices": [
                {
                    "text": "Whether each solder joint is beautiful and whether the shell is strong and durable",
                    "trait": "S"
                },
                {
                    "text": "Is the core logic behind this work \"subversive\"?",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Activity Preferences E/I",
            "description": "Participate in the opening ceremony of the National Science and Technology Innovation Competition.",
            "choices": [
                {
                    "text": "Take the initiative to take photos with classmates from other schools and exchange badges",
                    "trait": "E"
                },
                {
                    "text": "Hide in the rest area and study the technical parameters in the competition manual.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Communication Habits T/F",
            "description": "Faced with a very unreliable innovative idea from a social friend.",
            "choices": [
                {
                    "text": "Interrupt directly: \"This goes against common sense of physics, it's no use.\"",
                    "trait": "T"
                },
                {
                    "text": "Encourage him: \"The idea is interesting, although it is a bit difficult to implement.\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Work pace J/P",
            "description": "Laboratory cleaning.",
            "choices": [
                {
                    "text": "Everyone must be present every Friday at 4 p.m.",
                    "trait": "J"
                },
                {
                    "text": "It's up to you. If you see the table is too messy, just wipe it.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Vision Logic S/N",
            "description": "Discuss \"Smart Campus Construction\".",
            "choices": [
                {
                    "text": "It is recommended to install automatic rice-making machines in the canteen to reduce queuing time",
                    "trait": "S"
                },
                {
                    "text": "It is recommended to build a school-wide Internet of Things to achieve real-time sharing of data in all scenarios",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Emotional feedback T/F",
            "description": "The robot model I worked on late at night was broken during the competition.",
            "choices": [
                {
                    "text": "Calm review: The logic of the gravity sensor is not written correctly.",
                    "trait": "T"
                },
                {
                    "text": "Feeling distressed and frustrated: This is everyone's hard work for half a month",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Social Energy E/I",
            "description": "The laboratory was buzzing with people.",
            "choices": [
                {
                    "text": "Feeling full of inspiration and motivation to create",
                    "trait": "E"
                },
                {
                    "text": "My brain hurts and I want to take my computer to the library to write code.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task processing J/P",
            "description": "Received a new scientific and technological innovation task.",
            "choices": [
                {
                    "text": "Create documents, gather groups, and define DDL immediately",
                    "trait": "J"
                },
                {
                    "text": "Search for information first, or play games to come up with ideas.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Learning Style S/N",
            "description": "Learn Python programming.",
            "choices": [
                {
                    "text": "I like to follow the textbook and type the code line by line and see the running results.",
                    "trait": "S"
                },
                {
                    "text": "I like to look directly at the core logical architecture and then try to reproduce it myself.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Team Attitude T/F",
            "description": "Rate a co-op member.",
            "choices": [
                {
                    "text": "\"He is a technical master and can solve all bugs\"",
                    "trait": "T"
                },
                {
                    "text": "\"He is a soulful figure who can bring everyone together.\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Perception of achievement J/P",
            "description": "See that the laboratory is well organized.",
            "choices": [
                {
                    "text": "Feel great psychological comfort and sense of accomplishment",
                    "trait": "J"
                },
                {
                    "text": "I feel like I don't feel anything, I even feel a little too restrained",
                    "trait": "P"
                }
            ]
        }
    ],
    "10": [
        {
            "title": "Social Style E/I",
            "description": "Organize a sharing session after the \"Disability Experience\".",
            "choices": [
                {
                    "text": "Take the lead in sharing insights and encourage every silent member to speak up",
                    "trait": "E"
                },
                {
                    "text": "Write down a long reflection in the notebook and wait for others to call your name before talking about it",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Cognitive Depth S/N",
            "description": "Experience walking blindfolded.",
            "choices": [
                {
                    "text": "Pay attention to where the steps are too high and where the sound is too noisy",
                    "trait": "S"
                },
                {
                    "text": "Thinking about why society lacks care for people in architectural design",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Value conflict T/F",
            "description": "Discuss whether to provide extra snacks to members from needy families.",
            "choices": [
                {
                    "text": "Oppose, believing that community rules should be completely equal to everyone",
                    "trait": "T"
                },
                {
                    "text": "Support and believe that taking care of the disadvantaged groups is the real fairness",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Habitual style J/P",
            "description": "Plan a school-wide \"anti-bias\" exhibit.",
            "choices": [
                {
                    "text": "Accurate down to what posters are posted at each booth and who is responsible for guiding them",
                    "trait": "J"
                },
                {
                    "text": "Only the core areas are decided, and the rest is left to the members to freely display.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Empathic Feedback T/F",
            "description": "I saw someone posting discriminatory remarks online.",
            "choices": [
                {
                    "text": "Take a screenshot and write a logically logical rebuttal tweet",
                    "trait": "T"
                },
                {
                    "text": "I feel very angry and sad and want to contact the victim to offer comfort.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Information acquisition S/N",
            "description": "Promote the reduction of regional disparities.",
            "choices": [
                {
                    "text": "Come up with a comparison chart of GDP per capita in each province",
                    "trait": "S"
                },
                {
                    "text": "Share a fable about the \"digital divide\"",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Interactive Energy E/I",
            "description": "Celebration banquet after the event.",
            "choices": [
                {
                    "text": "Chatting and joking between banquets (or milk tea shops), the center of attention",
                    "trait": "E"
                },
                {
                    "text": "Sit in the corner and chat with your best friend about what you just experienced.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Rule Enforcement J/P",
            "description": "Statistical activity hours.",
            "choices": [
                {
                    "text": "Strictly check the attendance sheet, and you will not be able to pass if you miss 1 minute.",
                    "trait": "J"
                },
                {
                    "text": "I think it would be great if everyone came to participate. There is no need to be too rigid.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Evaluation criteria T/F",
            "description": "Evaluate the influence of the community.",
            "choices": [
                {
                    "text": "How many proposals submitted have been adopted by the school?",
                    "trait": "T"
                },
                {
                    "text": "How many marginalized students have been helped to regain their confidence?",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Communication Preferences E/I",
            "description": "Want to promote \"fairness\".",
            "choices": [
                {
                    "text": "Go to every class to give lectures",
                    "trait": "E"
                },
                {
                    "text": "Create a beautiful set of anonymous \"fair\" postcards to hand out",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Thinking Orientation S/N",
            "description": "Confronting inequality on campus.",
            "choices": [
                {
                    "text": "Pay attention to a specific scholarship evaluation that is unfair",
                    "trait": "S"
                },
                {
                    "text": "Consider the institutional roots of this injustice",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Organizational Attitudes J/P",
            "description": "The society faces an urgent task.",
            "choices": [
                {
                    "text": "Quickly gather core members and hold a short meeting to make plans",
                    "trait": "J"
                },
                {
                    "text": "Just shout in the group \"Whoever is free can do it\" and divide the work according to fate.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Emotional resonance T/F",
            "description": "Hear the stories of children from impoverished areas.",
            "choices": [
                {
                    "text": "Consider whether this story is typical of publicity",
                    "trait": "T"
                },
                {
                    "text": "Tears filled my eyes instantly and I wanted to donate immediately",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Collaboration Habits E/I",
            "description": "Group work.",
            "choices": [
                {
                    "text": "I like everyone to get together and discuss while eating snacks",
                    "trait": "E"
                },
                {
                    "text": "I like everyone to check the information individually first, and then hold a brief meeting to synchronize the information at the end.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Pursuit of ideals S/N",
            "description": "What do you want the club to do in the future:",
            "choices": [
                {
                    "text": "Build the largest campus mutual aid volunteer network in the country",
                    "trait": "S"
                },
                {
                    "text": "Become a spiritual symbol that conveys the fire of \"human equality\"",
                    "trait": "N"
                }
            ]
        }
    ],
    "11": [
        {
            "title": "Perception of details S/N",
            "description": "Entering an old community to do renovation planning.",
            "choices": [
                {
                    "text": "Staring at the cracks in the wall, the rusty handrails, and the location of the trash can",
                    "trait": "S"
                },
                {
                    "text": "I imagined the community and cultural atmosphere behind the coffee shop and bookstore.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Role E/I",
            "description": "In order to conduct research, we need to knock on the doors of strange residents.",
            "choices": [
                {
                    "text": "Knocking on the door, smiling, and introducing yourself all in one go without any embarrassment.",
                    "trait": "E"
                },
                {
                    "text": "Take three deep breaths outside the door, your heart beats faster, and you check your lines again and again.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Decision logic T/F",
            "description": "Is the open space in the community a parking space or a flower planting space?",
            "choices": [
                {
                    "text": "Repair parking spaces to solve the most urgent and realistic parking problem",
                    "trait": "T"
                },
                {
                    "text": "Plant flowers to make neighbors feel better and enhance community happiness",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Working mode J/P",
            "description": "\"Wall Painting and Beautification\" activity organized by the society.",
            "choices": [
                {
                    "text": "Each participant must paint according to the color number of the sketch",
                    "trait": "J"
                },
                {
                    "text": "Give everyone color and let everyone freely splash ink on the wall to create creations",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Focus on T/F",
            "description": "Rate your dorm life.",
            "choices": [
                {
                    "text": "Is the dormitory agreement implemented in place and the division of labor scientific?",
                    "trait": "T"
                },
                {
                    "text": "Are the roommates in the dormitory deeply emotionally connected and the atmosphere harmonious?",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Learning Preferences S/N",
            "description": "Take an urban planning class.",
            "choices": [
                {
                    "text": "I like to hear about the specific transportation hub design and pipeline network layout.",
                    "trait": "S"
                },
                {
                    "text": "Like to hear about \"futuristic architecture\" and \"cyberpunk city\" ideas",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Habits E/I",
            "description": "There is a community square dance event in the evening.",
            "choices": [
                {
                    "text": "Dance along with the rhythm and quickly mingle with the neighbor's aunt",
                    "trait": "E"
                },
                {
                    "text": "Watch from a distance and record this interesting phenomenon of social integration",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Run a newspaper for the community.",
            "choices": [
                {
                    "text": "Set a weekly magazine and it must be published on time every Friday.",
                    "trait": "J"
                },
                {
                    "text": "The periodical has been decided, and when will big news be published?",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Conflict feedback T/F",
            "description": "Two neighbors in the community had a quarrel over noise.",
            "choices": [
                {
                    "text": "Take out the decibel meter and legal provisions and rationally determine the responsible party",
                    "trait": "T"
                },
                {
                    "text": "Provided psychological counseling to two families to resolve years of grievances",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Information dissemination E/I",
            "description": "Promote a \"livable campus\".",
            "choices": [
                {
                    "text": "Hold a mobilization meeting and call on the whole school to jointly build",
                    "trait": "E"
                },
                {
                    "text": "Make a set of beautiful campus scenery handbooks and circulate them in a small area",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Habit Orientation S/N",
            "description": "Moved into new dormitory.",
            "choices": [
                {
                    "text": "You must buy a complete set of storage boxes to keep everything in its place",
                    "trait": "S"
                },
                {
                    "text": "Start by buying a projector or hanging a poster with depth",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Change response J/P",
            "description": "The scheduled community free clinic was canceled because the doctor was busy.",
            "choices": [
                {
                    "text": "I feel frustrated that my plans have been disrupted and I want to complain to the relevant personnel.",
                    "trait": "J"
                },
                {
                    "text": "Take the opportunity to hold an \"Emergency First Aid Knowledge Lecture\" to learn about tricks",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Value Judgment T/F",
            "description": "Do you prefer:",
            "choices": [
                {
                    "text": "Smart Cities: Ultimate Efficiency with AI Brains",
                    "trait": "T"
                },
                {
                    "text": "Shared City: Achieving neighborliness through spatial integration",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "I want to improve the traffic at the school gate.",
            "choices": [
                {
                    "text": "Stand at the intersection to guide volunteers, summarizing problems while working",
                    "trait": "E"
                },
                {
                    "text": "Write a detailed traffic optimization proposal and submit it to the school management committee",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task level S/N",
            "description": "Club goals for next week:",
            "choices": [
                {
                    "text": "Polish the handrails of 10 corridors in the community",
                    "trait": "S"
                },
                {
                    "text": "Plan a film exhibition with the theme of \"Community Historical Memories\"",
                    "trait": "N"
                }
            ]
        }
    ],
    "12": [
        {
            "title": "Shopping logic T/F",
            "description": "When buying stationery.",
            "choices": [
                {
                    "text": "Calculate the unit price and durability, and choose the one with the highest cost performance.",
                    "trait": "T"
                },
                {
                    "text": "Choose the one that not only looks good, but also has a brand promise to be environmentally friendly and reduce plastics",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Social Expression E/I",
            "description": "Responsible for the \"auction\" part of the flea market.",
            "choices": [
                {
                    "text": "Holding a gavel and bidding passionately on the stage, the atmosphere was full.",
                    "trait": "E"
                },
                {
                    "text": "Take photos of auction items, send pictures, and write descriptions in the audience",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Planned J/P",
            "description": "Planned the \"Double 11 Breakthrough\" activity.",
            "choices": [
                {
                    "text": "Specify in detail what can be donated and what can be sold, and label it",
                    "trait": "J"
                },
                {
                    "text": "Let everyone bring things and change the price according to the market while selling.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Thinking Perspective S/N",
            "description": "I saw someone wasting food in the canteen.",
            "choices": [
                {
                    "text": "Automatically calculate how much this dish is worth and how much labor is wasted",
                    "trait": "S"
                },
                {
                    "text": "Thinking of the pressure on global supply chains and the crisis of melting polar regions",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Feedback mentality T/F",
            "description": "A classmate bought an over-packaged Internet celebrity product.",
            "choices": [
                {
                    "text": "To put it bluntly: \"You're paying for pointless plastic.\"",
                    "trait": "T"
                },
                {
                    "text": "Euphemistically hinting: \"This packaging is very nice, but it's actually quite a pity.\"",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Sociability E/I",
            "description": "The club holds a workshop on \"renovation of old clothes\".",
            "choices": [
                {
                    "text": "While sewing, chat with fellow members and discuss outfits.",
                    "trait": "E"
                },
                {
                    "text": "A person quietly studies stitches and changes clothes into a unique style",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Strain Logic J/P",
            "description": "There was a sudden heavy rain at the flea market.",
            "choices": [
                {
                    "text": "Quickly instruct everyone to close the stalls and evacuate according to the \"Rainy Day Emergency Procedure\"",
                    "trait": "J"
                },
                {
                    "text": "Just hold a \"rain sale\", the wetter it is, the cheaper it is",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic Logic S/N",
            "description": "Promote sustainable living.",
            "choices": [
                {
                    "text": "A list of \"10 tips for saving water\"",
                    "trait": "S"
                },
                {
                    "text": "Plan a lecture on \"Minimalist Life Aesthetics\"",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Evaluation Decision T/F",
            "description": "Do you want to cooperate with a certain milk tea brand?",
            "choices": [
                {
                    "text": "See how many prizes and financial sponsorships it can bring to the club",
                    "trait": "T"
                },
                {
                    "text": "See if its environmental protection concept is 100% consistent with the community",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Habit Orientation J/P",
            "description": "Express cartons in the dormitory.",
            "choices": [
                {
                    "text": "Take one apart and fold it up, and send them to the recycling point at regular intervals.",
                    "trait": "J"
                },
                {
                    "text": "Save a lot and wait until you are in a good mood or have no place to stand.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Communication Energy E/I",
            "description": "In order to reduce plastic bags, work as a lobbyist at the campus supermarket.",
            "choices": [
                {
                    "text": "Chatting with the cashier for a long time, promoting environmental protection concepts",
                    "trait": "E"
                },
                {
                    "text": "Write a logical and logical letter of advice on plastic reduction to the supermarket manager",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task level S/N",
            "description": "Society goals:",
            "choices": [
                {
                    "text": "Statistics on how many tons of garbage are produced in the school every day",
                    "trait": "S"
                },
                {
                    "text": "Change the excessive consumption mentality of all students in the school",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Decision logic T/F",
            "description": "Scholarships were awarded.",
            "choices": [
                {
                    "text": "Save it, or buy something practical and large for study needs",
                    "trait": "T"
                },
                {
                    "text": "Treat everyone to a nice meal, or buy a trendy toy that you really want to buy.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Social Style E/I",
            "description": "The community gathers to play board games.",
            "choices": [
                {
                    "text": "A werewolf who likes liveliness and needs to talk all the time",
                    "trait": "E"
                },
                {
                    "text": "I like quiet, hard-core scripts that require logical thinking.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Complete target J/P",
            "description": "The one-month Zero Waste Challenge is over.",
            "choices": [
                {
                    "text": "Even if the last day is difficult, insist on completing it according to the rules",
                    "trait": "J"
                },
                {
                    "text": "That's almost it. If you forget to remember it for a few days in the middle, it doesn't count as a failure.",
                    "trait": "P"
                }
            ]
        }
    ],
    "13": [
        {
            "title": "Experimental Analysis S/N",
            "description": "The club measures temperature differences on different surfaces on campus.",
            "choices": [
                {
                    "text": "Stare at the numbers on the thermometer and hygrometer and accurately record the temperature difference between the asphalt road and the grass",
                    "trait": "S"
                },
                {
                    "text": "Consider how these data prove that the urban heat island effect is changing microclimates",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Speech Preparation E/I",
            "description": "The school held a debate competition on the theme of \"Climate Change\".",
            "choices": [
                {
                    "text": "Enjoy the verbal sparring on the debate stage and convince the judges with your infectious energy",
                    "trait": "E"
                },
                {
                    "text": "Responsible for collecting evidence in the audience and organizing a logical and rigorous debate outline",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Values ​​T/F",
            "description": "I saw someone turning on the air conditioner in an empty classroom all night just to keep cool.",
            "choices": [
                {
                    "text": "Report this energy violation directly to the Academic Affairs Office",
                    "trait": "T"
                },
                {
                    "text": "Turn off the air conditioner first and send a gentle reminder to the group, lest everyone be notified and criticized.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Plan the \"Low Carbon Weekly Challenge\".",
            "choices": [
                {
                    "text": "The daily punch-in content from Monday to Friday must be strictly implemented and cannot be missed.",
                    "trait": "J"
                },
                {
                    "text": "Everyone can check in flexibly according to their own class schedule, as long as they do 5 things in a week",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Vision Logic S/N",
            "description": "See extreme weather warnings (such as heavy rain or drought).",
            "choices": [
                {
                    "text": "Worrying about whether tomorrow's physical education class will be canceled or whether the dormitory will have a power outage.",
                    "trait": "S"
                },
                {
                    "text": "Lamenting that global climate imbalance has reached a critical point, thinking about the future of mankind",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Interactive style E/I",
            "description": "In order to promote carbon neutrality, flyers were distributed in every dormitory.",
            "choices": [
                {
                    "text": "Every time I enter a door, I happily chat with my roommates.",
                    "trait": "E"
                },
                {
                    "text": "Stuff the flyer under the door, or just give it to familiar classmates",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Error correction logic T/F",
            "description": "Volunteers miscalculated one unit when tallying their carbon footprint.",
            "choices": [
                {
                    "text": "He must be asked to do the calculation again. The data does not allow for any sensational exaggeration.",
                    "trait": "T"
                },
                {
                    "text": "I don't think it's okay, as long as it can promote environmental protection.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Schedule Habits J/P",
            "description": "The club wants to make a short video about climate.",
            "choices": [
                {
                    "text": "You must first write the script, storyboard, and set a shooting schedule",
                    "trait": "J"
                },
                {
                    "text": "Take your phone and wander around campus, taking pictures of whatever inspiration you find.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic preferences S/N",
            "description": "Design club's cultural shirts.",
            "choices": [
                {
                    "text": "Print a realistic photo of a polar bear standing on crushed ice",
                    "trait": "S"
                },
                {
                    "text": "Printed with an abstract green swirl, symbolizing the breathing of the earth",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Decision basis T/F",
            "description": "Elect a \"Climate Ambassador\".",
            "choices": [
                {
                    "text": "Choose the top student who has published relevant papers and won awards",
                    "trait": "T"
                },
                {
                    "text": "Choose the partner who is most passionate about environmental protection and can inspire everyone's emotions the most",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Study Habits S/N",
            "description": "Listen to a special lecture on \"Extreme Weather\".",
            "choices": [
                {
                    "text": "Record the name of each hurricane and the specific year it occurred",
                    "trait": "S"
                },
                {
                    "text": "Thinking about the underlying dynamic logic of atmospheric circulation changes",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Contingency style J/P",
            "description": "It suddenly rained during outdoor promotion.",
            "choices": [
                {
                    "text": "I feel so depressed and all my plans for the day are ruined.",
                    "trait": "J"
                },
                {
                    "text": "I think this is a good opportunity to experience climate change in an \"immersive\" way, so keep doing it",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "I want to call on all teachers and students in the school to turn off the lights for one hour.",
            "choices": [
                {
                    "text": "Set up a microphone at the entrance of the cafeteria and give a passionate speech to collect signatures",
                    "trait": "E"
                },
                {
                    "text": "Create a beautiful H5 page and forward it silently on social platforms",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Competitive mentality T/F",
            "description": "Lost to the class next door in the environmental protection knowledge contest.",
            "choices": [
                {
                    "text": "Review what you memorized incorrectly, and you must win it back logically next time",
                    "trait": "T"
                },
                {
                    "text": "I feel that the most important thing is to participate. I am very happy that I have made good friends in the process.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Feedback requirements E/I",
            "description": "The planned event was reported by the school newspaper.",
            "choices": [
                {
                    "text": "Send a private message to each friend who helped forward the message to express gratitude.",
                    "trait": "E"
                },
                {
                    "text": "Quietly cut out the newspaper and paste it in your diary as a keepsake",
                    "trait": "I"
                }
            ]
        }
    ],
    "14": [
        {
            "title": "Popular science details S/N",
            "description": "During a guided tour of the \"Marine Life Exhibition\".",
            "choices": [
                {
                    "text": "Accurately call the name, length and lifespan of each deep-sea fish",
                    "trait": "S"
                },
                {
                    "text": "Describe to students the magical cycle of the ocean as the \"lungs of the earth\"",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Expression E/I",
            "description": "Hold the \"Mermaid Princess/Prince\" environmental tryout.",
            "choices": [
                {
                    "text": "Serve as the host, control the scene with humor and mobilize the atmosphere on stage",
                    "trait": "E"
                },
                {
                    "text": "Responsible for the background makeup and sound effects to ensure that every process is error-free",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Planned J/P",
            "description": "The club is going to the off-campus wetland to observe water birds and underwater plants.",
            "choices": [
                {
                    "text": "Book your telescope, record book and precise shuttle bus time in advance",
                    "trait": "J"
                },
                {
                    "text": "Let's talk about the place. If you see a beautiful piece of water, go and stay there.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Values ​​T/F",
            "description": "I saw the canteen serving rare fish of unknown origin.",
            "choices": [
                {
                    "text": "Gather evidence to submit a formal letter of complaint to the School Meals Committee",
                    "trait": "T"
                },
                {
                    "text": "I thought it might just be a misunderstanding, so I asked the cafeteria man in private to suggest changing the recipe.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Thinking Perspective S/N",
            "description": "Talking about microplastic pollution.",
            "choices": [
                {
                    "text": "Concerned about how it affects the quality of the mineral water we drink every day",
                    "trait": "S"
                },
                {
                    "text": "Worried about the collapse of the entire marine ecological chain and mass extinction of species",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Interactive style E/I",
            "description": "The club wants to create a \"simulated coral reef\" display in the campus fountain pool.",
            "choices": [
                {
                    "text": "Actively grab passers-by and ask them to \"color\" the corals and interact with them",
                    "trait": "E"
                },
                {
                    "text": "Carefully write each display sign to make the popular science content more profound.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Error correction logic T/F",
            "description": "The group members wrote \"fish\" instead of \"whale\" on the poster (whales are mammals).",
            "choices": [
                {
                    "text": "Seriously pointing out this common sense error will reduce the professionalism of the association",
                    "trait": "T"
                },
                {
                    "text": "I think it doesn't matter. Ordinary people can't see it anyway, so there's no need to reprint it.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Write a tweet about \"coral bleaching.\"",
            "choices": [
                {
                    "text": "Make an outline of points one, two, and three and code the words in a logical order.",
                    "trait": "J"
                },
                {
                    "text": "First find a beautiful picture and improvise text according to the artistic conception of the picture.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Aesthetic preferences S/N",
            "description": "Design a club mascot.",
            "choices": [
                {
                    "text": "A Q version of a turtle with a specific species",
                    "trait": "S"
                },
                {
                    "text": "A glowing, mystical jellyfish graphic symbolizing the soul of the ocean",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Decision basis T/F",
            "description": "Select the outstanding members of the society for the year.",
            "choices": [
                {
                    "text": "Reward the member who completes the task most efficiently and never makes mistakes",
                    "trait": "T"
                },
                {
                    "text": "Reward the \"little sun\" who always encourages his peers when they are down.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Study Habits S/N",
            "description": "Learn about ocean currents.",
            "choices": [
                {
                    "text": "First draw a map of the world and mark the names of each warm and cold current.",
                    "trait": "S"
                },
                {
                    "text": "Let's first think about how the earth's rotation and temperature differences jointly drive this huge system.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Contingency style J/P",
            "description": "A planned beach litter pickup was postponed due to school bedtime checks.",
            "choices": [
                {
                    "text": "Feeling that the plan was ruined, very angry, kept looking at the watch",
                    "trait": "J"
                },
                {
                    "text": "I think it's okay to go later, just in time to watch an ocean documentary in the dormitory.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "I want to invite professional divers to come to the school to share.",
            "choices": [
                {
                    "text": "Use various connections to find the other party's phone number and call them directly to communicate.",
                    "trait": "E"
                },
                {
                    "text": "Follow the other person's social account first and politely express your intentions through private messages.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Competitive mentality T/F",
            "description": "Lost to \"Shanlin Club\" in the club competition.",
            "choices": [
                {
                    "text": "I think the logic of our activities is fine, but the scoring criteria may be biased.",
                    "trait": "T"
                },
                {
                    "text": "I am really happy for Shanlin Club and want to join them to celebrate",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Feedback requirements E/I",
            "description": "I saw the ocean poster I drew posted at the school gate.",
            "choices": [
                {
                    "text": "Drag your good buddies/best friends to check in and take a group photo in front of the poster",
                    "trait": "E"
                },
                {
                    "text": "Take a look at it from a distance, make sure it's not crooked, and then walk away with satisfaction.",
                    "trait": "I"
                }
            ]
        }
    ],
    "15": [
        {
            "title": "Perception of details S/N",
            "description": "Follow the instructor to do a plant census in the back mountain.",
            "choices": [
                {
                    "text": "Pay attention to the shape of the leaves, whether there are jagged edges, and the texture of the rhizome.",
                    "trait": "S"
                },
                {
                    "text": "Sigh the diversity of this ecosystem and think about the possibility of species invasion",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Role E/I",
            "description": "Organize the \"Campus Stray Cat Census\" activity.",
            "choices": [
                {
                    "text": "Establish a \"cat petting group\" and loudly call for volunteers to join",
                    "trait": "E"
                },
                {
                    "text": "Responsible for establishing stray cat files, entering photos and health status",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Decision logic T/F",
            "description": "Finding an injured stray dog ​​costs a fortune.",
            "choices": [
                {
                    "text": "It is recommended to crowdfund first, but if the money is not enough, the community's affordability should be considered and the loss should be stopped rationally.",
                    "trait": "T"
                },
                {
                    "text": "We must save it no matter what, even if we are frugal, we must treat it",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Working mode J/P",
            "description": "Organize a \"mountain trash cleanup\" event.",
            "choices": [
                {
                    "text": "Divide areas A, B, and C. Everyone must clear their own area.",
                    "trait": "J"
                },
                {
                    "text": "Let's just walk around, pick up whatever is dirty when we see it, and explore as we please.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Focus on T/F",
            "description": "Evaluate every action of the community.",
            "choices": [
                {
                    "text": "Whether the predetermined environmental protection indicators (such as sapling survival rate) have been achieved",
                    "trait": "T"
                },
                {
                    "text": "Did everyone enhance their cohesion during the process of climbing mountains and planting trees?",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Learning Preferences S/N",
            "description": "Learn about biological evolution.",
            "choices": [
                {
                    "text": "I like to see the details of the beaks of various birds that Darwin observed.",
                    "trait": "S"
                },
                {
                    "text": "Like to think about the grand law of life such as \"survival of the fittest\"",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Habits E/I",
            "description": "I encountered students who didn't care for the lawn and stepped on flowers and grass randomly.",
            "choices": [
                {
                    "text": "Walk over to stop them and explain the importance of lawns in public",
                    "trait": "E"
                },
                {
                    "text": "Silently put up a more creative warning sign beside the lawn",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Prepare PPT for club recruitment.",
            "choices": [
                {
                    "text": "Rehearse three times in advance to make sure each page is just the right length",
                    "trait": "J"
                },
                {
                    "text": "Only prepare a general framework and improvise based on the reactions of the freshmen in the audience after taking the stage.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Conflict feedback T/F",
            "description": "Someone suggested changing the club activity into a more fun picnic.",
            "choices": [
                {
                    "text": "Oppose, believing that this will dispel the professionalism of the association and increase the burden of environmental sanitation",
                    "trait": "T"
                },
                {
                    "text": "I think it's okay. This will attract more people and make the atmosphere more relaxed.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Information dissemination E/I",
            "description": "Promote \"Suburban Forest Fire Prevention\".",
            "choices": [
                {
                    "text": "Organize volunteers to go to nearby villages and knock on doors to promote propaganda.",
                    "trait": "E"
                },
                {
                    "text": "Make a set of exquisite animal and plant postcards with fire prevention tips",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Habit Orientation S/N",
            "description": "Take a trip to nature during the summer vacation.",
            "choices": [
                {
                    "text": "Bring a full set of equipment: compass, jacket, high-energy biscuits",
                    "trait": "S"
                },
                {
                    "text": "I only have a heart to explore and haven't even decided on a specific hotel.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Change response J/P",
            "description": "With rain in the forecast, scheduled bird watching activities may be cancelled.",
            "choices": [
                {
                    "text": "I feel like my mood for the whole day has been ruined, and I'm very resistant to change.",
                    "trait": "J"
                },
                {
                    "text": "Think it might be more fun to watch birds in the rain, or go to an indoor museum instead",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Value Judgment T/F",
            "description": "Facing species extinction.",
            "choices": [
                {
                    "text": "Think about how much damage this will cause to human pharmaceuticals or scientific research",
                    "trait": "T"
                },
                {
                    "text": "Feeling that the disappearance of an independent life is the greatest sorrow in the universe",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "I want to call on school cafeterias to stop using disposable chopsticks.",
            "choices": [
                {
                    "text": "Do a joint signing at the entrance of the canteen, the more people there are, the more exciting it will be",
                    "trait": "E"
                },
                {
                    "text": "Write a detailed cost research report and send it directly to the principal's email address",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task level S/N",
            "description": "Next event plan:",
            "choices": [
                {
                    "text": "Hang ID tags with QR codes on 50 ancient trees in the school",
                    "trait": "S"
                },
                {
                    "text": "Plan an \"animistic\" forest immersive art exhibition",
                    "trait": "N"
                }
            ]
        }
    ],
    "16": [
        {
            "title": "Perception of details S/N",
            "description": "Submit a question in the \"Legal Popularization Knowledge Competition\".",
            "choices": [
                {
                    "text": "Confused about whether every word in the legal provisions is rigorous and accurate",
                    "trait": "S"
                },
                {
                    "text": "Consider whether the logic of fairness and justice behind these laws can withstand scrutiny",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Role E/I",
            "description": "Organize the \"Campus Anti-Fraud\" sitcom.",
            "choices": [
                {
                    "text": "Competing to play the cunning liar or the just policeman, the performance is full of excitement",
                    "trait": "E"
                },
                {
                    "text": "Responsible for writing the reversal of logic in the script, or managing the lighting in the audience",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Decision logic T/F",
            "description": "It was discovered that someone within the club had forged attendance records in order to evaluate scholarships.",
            "choices": [
                {
                    "text": "Absolute zero tolerance, immediate disqualification and notification to the whole society to show fairness",
                    "trait": "T"
                },
                {
                    "text": "Talk to him first, understand his difficulties, and hope he can take the initiative to withdraw.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Working mode J/P",
            "description": "Organize \"mock court\" activities.",
            "choices": [
                {
                    "text": "Judges, lawyers, and witnesses must follow the script and procedures and must not mess up for a second.",
                    "trait": "J"
                },
                {
                    "text": "Just set the evidence and let everyone debate freely during the trial to see who reacts fastest",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Focus on T/F",
            "description": "Evaluate a legal education activity.",
            "choices": [
                {
                    "text": "Whether the scene is logically closed and whether legal common sense is conveyed accurately",
                    "trait": "T"
                },
                {
                    "text": "Can the students listen and feel the sense of security of being protected?",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Learning Preferences S/N",
            "description": "Study the history of Chinese legal system.",
            "choices": [
                {
                    "text": "Memorize the names of official positions and types of torture in each dynasty",
                    "trait": "S"
                },
                {
                    "text": "Thinking about how the \"rule of law\" evolves from the rule of man to the institutional guarantee of a civilized society",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Habits E/I",
            "description": "In order to resolve the dormitory conflict, the club sent you to mediate.",
            "choices": [
                {
                    "text": "The two sides of the organization sit together and you act as the middleman and mediate loudly.",
                    "trait": "E"
                },
                {
                    "text": "First have a private chat with both parties and resolve the differences in a quiet atmosphere.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Prepare the association's annual compliance report.",
            "choices": [
                {
                    "text": "Strictly follow the catalog layout and start writing two weeks in advance",
                    "trait": "J"
                },
                {
                    "text": "Record various events as they happen, and only consolidate them into typesetting on the last day",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Conflict feedback T/F",
            "description": "When legal provisions conflict with personal emotions.",
            "choices": [
                {
                    "text": "Adhere to the principle of law above all else, and personal emotions must be subordinated to collective justice",
                    "trait": "T"
                },
                {
                    "text": "Believes that the law should have warmth and have discretion in the face of human nature",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Information dissemination E/I",
            "description": "Promote \"World Peace Day\".",
            "choices": [
                {
                    "text": "Hold a large lawn gathering and let everyone fly the peace dove together",
                    "trait": "E"
                },
                {
                    "text": "Plan a \"silent reading group\" to read profound reflections on the war",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Habit Orientation S/N",
            "description": "See the rules on campus (e.g. no takeout allowed).",
            "choices": [
                {
                    "text": "Carefully read every rule on the sign and the consequences for violating it",
                    "trait": "S"
                },
                {
                    "text": "Think about the rationality of these rules and their balance of power for students",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Change response J/P",
            "description": "The guests of \"Moot Court\" have been temporarily replaced.",
            "choices": [
                {
                    "text": "I felt extremely uneasy and felt that the entire prepared logic was completely messed up.",
                    "trait": "J"
                },
                {
                    "text": "I don't think it's okay. Changing the style may be more collision-like, so go straight to it.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Value Judgment T/F",
            "description": "If you become a judge, you pursue:",
            "choices": [
                {
                    "text": "The authority of the law: impartiality, impartiality and ruthlessness",
                    "trait": "T"
                },
                {
                    "text": "Social resilience: resolving hatred and rebuilding old friendships",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "Want to improve the school's complaint feedback mechanism.",
            "choices": [
                {
                    "text": "Take the club members to debate with the student union president face to face and demand reforms.",
                    "trait": "E"
                },
                {
                    "text": "Silently compiled 100 questionnaires and submitted the report using data",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task level S/N",
            "description": "Club goals for next week:",
            "choices": [
                {
                    "text": "Distribute anti-bullying handbook to 2,000 people across the school",
                    "trait": "S"
                },
                {
                    "text": "Discussing privacy protection issues in the \"artificial intelligence era\"",
                    "trait": "N"
                }
            ]
        }
    ],
    "17": [
        {
            "title": "Perception of details S/N",
            "description": "At the \"Cross-Society Resource Matchmaking Meeting\".",
            "choices": [
                {
                    "text": "Pay attention to how much activity funds, tables, chairs and equipment each club can provide",
                    "trait": "S"
                },
                {
                    "text": "Pay attention to the new sparks that may arise after the collision of different community concepts.",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Role E/I",
            "description": "You are the \"foreign affairs\" minister of the society.",
            "choices": [
                {
                    "text": "Active in dozens of external groups every day, he is a famous social expert",
                    "trait": "E"
                },
                {
                    "text": "Only conduct one-to-one meetings when formal signing or cooperation is required.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Decision logic T/F",
            "description": "A certain club wanted to work with us, but their reputation was average.",
            "choices": [
                {
                    "text": "Refuse to cooperate, believing that the cost of brand damage is much higher than the benefits of cooperation",
                    "trait": "T"
                },
                {
                    "text": "Try to give the other person a hand and feel that you can guide them to good things through cooperation.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Working mode J/P",
            "description": "Planned the \"SDG Carnival\" jointly organized by the three schools.",
            "choices": [
                {
                    "text": "A tripartite agreement must be signed first to set liability sharing and compensation terms.",
                    "trait": "J"
                },
                {
                    "text": "Everyone agrees verbally first, and the specific implementation can be flexibly adjusted according to the situation of each school.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Focus on T/F",
            "description": "Evaluate whether the partner is good or not.",
            "choices": [
                {
                    "text": "Able to work quickly, not procrastinate, and do everything promised",
                    "trait": "T"
                },
                {
                    "text": "Comfortable communication, good personality, able to help each other when encountering difficulties",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Learning Preferences S/N",
            "description": "Listen to the report on \"Global Cooperation\".",
            "choices": [
                {
                    "text": "I like to hear about each country's import and export quotas and specific trade agreement terms.",
                    "trait": "S"
                },
                {
                    "text": "Like to hear about the concept of \"global village\" and the model of barriers to cross-cultural communication",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Social Habits E/I",
            "description": "The cooperative project was a great success.",
            "choices": [
                {
                    "text": "I suggest you hold a carnival party and you won't come home until you get drunk.",
                    "trait": "E"
                },
                {
                    "text": "Send a long, sincere thank you letter to your partner to express your gratitude",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task Execution J/P",
            "description": "Responsible for managing the \"external resource library\" of the society.",
            "choices": [
                {
                    "text": "Clear classification (government, enterprise, fraternal societies), regularly updated",
                    "trait": "J"
                },
                {
                    "text": "Just write it down on various notepads, and you can always turn to it when you need it.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Conflict feedback T/F",
            "description": "The partner suddenly said that he had no funds.",
            "choices": [
                {
                    "text": "Act according to the contract and ask the other party to compensate or find alternative resources",
                    "trait": "T"
                },
                {
                    "text": "He said it doesn't matter, let's find a way to share more and don't make it difficult for the other party.",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Information dissemination E/I",
            "description": "Looking for sponsors to support SDG activities.",
            "choices": [
                {
                    "text": "Go to various stores with a plan to sweep the streets and meet face to face with the bosses",
                    "trait": "E"
                },
                {
                    "text": "Place advertisements through social software and wait for interested parties to come to you.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Vision Logic S/N",
            "description": "Think \"partnership.\"",
            "choices": [
                {
                    "text": "Focus on whether specific one-on-one collaboration can get things done",
                    "trait": "S"
                },
                {
                    "text": "Think about how to form a symbiotic support network across the school and even around the world",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "Change response J/P",
            "description": "The partners temporarily added an activity link.",
            "choices": [
                {
                    "text": "I feel very crazy and feel that all the original plans are ruined.",
                    "trait": "J"
                },
                {
                    "text": "I found it very challenging and immediately excitedly started thinking of ideas for new sessions.",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "Value Judgment T/F",
            "description": "Purpose of cooperation:",
            "choices": [
                {
                    "text": "Integrate resources, improve efficiency, and maximize goals",
                    "trait": "T"
                },
                {
                    "text": "Build emotional connections so that the world is no longer an island",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "Communication methods E/I",
            "description": "Want to solve the problem of cross-departmental buck-passing.",
            "choices": [
                {
                    "text": "Call all the responsible persons together to hold a \"complaint meeting\" and solve the problem in person",
                    "trait": "E"
                },
                {
                    "text": "Visit each party privately to find out the difficulties of all parties before coming up with a coordination plan.",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "Task level S/N",
            "description": "Club goals for next week:",
            "choices": [
                {
                    "text": "Signed waste battery recycling agreements with three charity supermarkets outside the school",
                    "trait": "S"
                },
                {
                    "text": "Building a prototype of an \"Interdisciplinary SDG Innovation Laboratory\"",
                    "trait": "N"
                }
            ]
        }
    ]
};

// ===================== 关卡模板（中文） =====================
const templates_zh = {
    "1": [
        {
            "title": "第 1 题",
            "description": "社团要举办“暖冬爱心周”动员会。",
            "choices": [
                {
                    "text": "站在台上慷慨陈词，调动全场气氛",
                    "trait": "E"
                },
                {
                    "text": "负责分发材料，在角落里观察大家的反应",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 2 题",
            "description": "整理募捐到的旧书。",
            "choices": [
                {
                    "text": "仔细核对每一本书是否有折痕、笔记或破损",
                    "trait": "S"
                },
                {
                    "text": "思考这些书将如何打开偏远地区孩子们的视野",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 3 题",
            "description": "一个同学错过了募捐时间，哭着想补捐。",
            "choices": [
                {
                    "text": "告诉他系统已关闭，规则必须遵守以方便后期统计",
                    "trait": "T"
                },
                {
                    "text": "破例帮他联系仓库，不忍心拒绝这份善意",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 4 题",
            "description": "准备去社区调研。",
            "choices": [
                {
                    "text": "提前规划好每一步路径，精确到几点几分出发",
                    "trait": "J"
                },
                {
                    "text": "只定好集合地点，剩下的边走边探索",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 5 题",
            "description": "讨论扶贫方案。",
            "choices": [
                {
                    "text": "关注如何增加筹款的数额",
                    "trait": "S"
                },
                {
                    "text": "关注如何从根本上改变贫困者的思维方式",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 6 题",
            "description": "宣传摊位前围满了人。",
            "choices": [
                {
                    "text": "兴奋地与每一个人交谈",
                    "trait": "E"
                },
                {
                    "text": "感到能量消耗很快，想回办公室休息一下",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 7 题",
            "description": "看到社员分发物资时出了错。",
            "choices": [
                {
                    "text": "严厉指出流程错误，要求立即改正",
                    "trait": "T"
                },
                {
                    "text": "温柔安慰社员，先平复他的心情再解决问题",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 8 题",
            "description": "处理过期的捐赠食品。",
            "choices": [
                {
                    "text": "直接按照规定报废处理",
                    "trait": "J"
                },
                {
                    "text": "思考是否能联系农场做成有机肥料",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 9 题",
            "description": "构思宣传语。",
            "choices": [
                {
                    "text": "倾向于使用“已筹款10万元”这种硬核事实",
                    "trait": "S"
                },
                {
                    "text": "倾向于使用“点亮生命之光”这种文学化隐喻",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 10 题",
            "description": "社团招新面试。",
            "choices": [
                {
                    "text": "喜欢性格开朗、能说会道的社交达人",
                    "trait": "E"
                },
                {
                    "text": "喜欢沉稳内敛、专注做事的实干家",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 11 题",
            "description": "活动经费超支了。",
            "choices": [
                {
                    "text": "拿出计算器，理智地削减后续开支",
                    "trait": "T"
                },
                {
                    "text": "担心削减开支会影响受助者的心情，感到纠结",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 12 题",
            "description": "撰写活动总结。",
            "choices": [
                {
                    "text": "按逻辑框架逐条汇报成果",
                    "trait": "J"
                },
                {
                    "text": "随意记录感悟，甚至加了几张涂鸦",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 13 题",
            "description": "面对贫困现状的社会报道。",
            "choices": [
                {
                    "text": "关注具体的贫困率和地理分布",
                    "trait": "S"
                },
                {
                    "text": "思考报道背后的公平正义与哲学命题",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 14 题",
            "description": "志愿者临时放鸽子。",
            "choices": [
                {
                    "text": "感到很愤怒，认为其极度缺乏责任感",
                    "trait": "T"
                },
                {
                    "text": "担心对方是不是出了什么意外，想去询问",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 15 题",
            "description": "策划下学期的活动。",
            "choices": [
                {
                    "text": "沿用今年的成功模板，求稳",
                    "trait": "J"
                },
                {
                    "text": "即使旧方案很好，也想推倒重来搞个创新的",
                    "trait": "P"
                }
            ]
        }
    ],
    "2": [
        {
            "title": "第 1 题",
            "description": "在食堂观察“光盘”情况。",
            "choices": [
                {
                    "text": "主动询问没吃完的同学原因",
                    "trait": "E"
                },
                {
                    "text": "默默在远处数盘子并记录数据",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 2 题",
            "description": "讲解剩食科普。",
            "choices": [
                {
                    "text": "详细讲解食物腐烂产生的甲烷量",
                    "trait": "S"
                },
                {
                    "text": "将浪费描述为对地球未来的某种掠夺",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 3 题",
            "description": "处理社团内部的小矛盾。",
            "choices": [
                {
                    "text": "开诚布公地谈判，谁错谁道歉",
                    "trait": "T"
                },
                {
                    "text": "私下分别劝和，避免当面冲突",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 4 题",
            "description": "准备明天的打卡活动。",
            "choices": [
                {
                    "text": "检查打卡印章、红印泥、登记表是否备齐",
                    "trait": "S"
                },
                {
                    "text": "想象活动现场大家热情参与的感人画面",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 5 题",
            "description": "给浪费的同学写警示卡。",
            "choices": [
                {
                    "text": "语气强硬：浪费可耻，请自重",
                    "trait": "T"
                },
                {
                    "text": "语气温和：一米一粟，得之不易",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 6 题",
            "description": "社团会议。",
            "choices": [
                {
                    "text": "踊跃发言，不让冷场",
                    "trait": "E"
                },
                {
                    "text": "只有被点名才开口",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 7 题",
            "description": "制订节粮规范。",
            "choices": [
                {
                    "text": "要求所有人严格遵守，不留死角",
                    "trait": "J"
                },
                {
                    "text": "觉得应该留出弹性空间，比如生病没胃口",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 8 题",
            "description": "构思创意海报。",
            "choices": [
                {
                    "text": "画一个具体的裂开的饭碗",
                    "trait": "S"
                },
                {
                    "text": "用抽象线条表达资源枯竭感",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 9 题",
            "description": "发现合作伙伴不靠谱。",
            "choices": [
                {
                    "text": "按照协议条款直接解除合作",
                    "trait": "T"
                },
                {
                    "text": "觉得对方也有难处，再给一次机会",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 10 题",
            "description": "活动前的准备。",
            "choices": [
                {
                    "text": "必须在今晚10点前全部检查完毕",
                    "trait": "J"
                },
                {
                    "text": "觉得明天早起半小时搞定也来得及",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 11 题",
            "description": "社交媒体宣传。",
            "choices": [
                {
                    "text": "发起全校范围的视频挑战赛",
                    "trait": "E"
                },
                {
                    "text": "撰写深度长文引起共鸣",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 12 题",
            "description": "评价一个节粮点子。",
            "choices": [
                {
                    "text": "先看它能不能省出钱来",
                    "trait": "T"
                },
                {
                    "text": "先看它能不能温暖人心",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "第 13 题",
            "description": "面对混乱的库房。",
            "choices": [
                {
                    "text": "立刻开始分类整理，标上标签",
                    "trait": "J"
                },
                {
                    "text": "觉得乱点没关系，只要能找到东西",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 14 题",
            "description": "想象未来的农业。",
            "choices": [
                {
                    "text": "全自动化的机械和精准喷淋",
                    "trait": "S"
                },
                {
                    "text": "人类与土地和谐共生的理想国",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 15 题",
            "description": "面对突如其来的媒体采访。",
            "choices": [
                {
                    "text": "兴奋地侃侃而谈",
                    "trait": "E"
                },
                {
                    "text": "感到紧张，希望社长去接洽",
                    "trait": "I"
                }
            ]
        }
    ],
    "3": [
        {
            "title": "第 1 题",
            "description": "组织心理疏导小组。",
            "choices": [
                {
                    "text": "引导大家玩破冰游戏，打破沉默",
                    "trait": "E"
                },
                {
                    "text": "给大家一段安静冥想的时间",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 2 题",
            "description": "描述健康的状态。",
            "choices": [
                {
                    "text": "指标正常，没有感冒发烧",
                    "trait": "S"
                },
                {
                    "text": "灵魂充盈，对生命充满渴望",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 3 题",
            "description": "团辅中有人哭了。",
            "choices": [
                {
                    "text": "递上纸巾并默默倾听",
                    "trait": "F"
                },
                {
                    "text": "分析他哭的原因并给出专业建议",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "第 4 题",
            "description": "策划运动打卡周。",
            "choices": [
                {
                    "text": "规定每天跑3公里，少一米都不行",
                    "trait": "J"
                },
                {
                    "text": "只要有运动就行，种类不限",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 5 题",
            "description": "面对他人的请求。",
            "choices": [
                {
                    "text": "总是很难说“不”，怕伤感情",
                    "trait": "F"
                },
                {
                    "text": "觉得不合理就果断拒绝",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "第 6 题",
            "description": "准备科普讲座PPT。",
            "choices": [
                {
                    "text": "引用最新的医学期刊数据",
                    "trait": "S"
                },
                {
                    "text": "探讨身心平衡的人生哲学",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 7 题",
            "description": "活动现场的布置。",
            "choices": [
                {
                    "text": "严格按草图还原，位置不偏一毫米",
                    "trait": "J"
                },
                {
                    "text": "感觉哪里放着好看就放哪里",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 8 题",
            "description": "同学咨询情绪问题。",
            "choices": [
                {
                    "text": "给予他情感上的绝对支持",
                    "trait": "F"
                },
                {
                    "text": "帮他厘清逻辑，找出烦恼源头",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "第 9 题",
            "description": "社团招新宣讲。",
            "choices": [
                {
                    "text": "走到台下与新生近距离互动",
                    "trait": "E"
                },
                {
                    "text": "站在讲台后有条不紊地念稿",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 10 题",
            "description": "工作了一整天。",
            "choices": [
                {
                    "text": "想去聚餐分享今天的趣闻",
                    "trait": "E"
                },
                {
                    "text": "想回家洗个热水澡，关掉手机",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "第 11 题",
            "description": "思考社团的发展。",
            "choices": [
                {
                    "text": "考虑下个月增加多少会员",
                    "trait": "S"
                },
                {
                    "text": "考虑如何改变学校对心理问题的偏见",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 12 题",
            "description": "处理社员的失误。",
            "choices": [
                {
                    "text": "觉得批评会破坏团队氛围，选择包容",
                    "trait": "F"
                },
                {
                    "text": "认为应该明确责权，避免再犯",
                    "trait": "T"
                }
            ]
        },
        {
            "title": "第 13 题",
            "description": "面对截止日期。",
            "choices": [
                {
                    "text": "提前好几天完成，享受空闲",
                    "trait": "J"
                },
                {
                    "text": "享受最后时刻冲刺带来的快感",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "第 14 题",
            "description": "介绍预防近视。",
            "choices": [
                {
                    "text": "讲具体的手法和光线要求",
                    "trait": "S"
                },
                {
                    "text": "讲眼睛是通往世界的窗户",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "第 15 题",
            "description": "看到社员状态不佳。",
            "choices": [
                {
                    "text": "关切地询问他的生活琐事",
                    "trait": "F"
                },
                {
                    "text": "提醒他不要因为个人情绪影响进度",
                    "trait": "T"
                }
            ]
        }
    ],
    "4": [
        {
            "title": "教学风格 E/I",
            "description": "如果让你给低年级的小弟弟小妹妹讲一课。",
            "choices": [
                {
                    "text": "喜欢设计很多互动游戏，带大家边跳边学",
                    "trait": "E"
                },
                {
                    "text": "喜欢安安静静地讲故事，引导大家思考",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "学习重点 S/N",
            "description": "听老师讲一门全新的科学课。",
            "choices": [
                {
                    "text": "关注具体的实验步骤和最后看到的现象",
                    "trait": "S"
                },
                {
                    "text": "关注这个科学原理能用来发明什么新东西",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "作业评价 T/F",
            "description": "你的好朋友作业没写完被老师批评了。",
            "choices": [
                {
                    "text": "觉得老师做得对，不写作业就该受到教育",
                    "trait": "T"
                },
                {
                    "text": "觉得老师太凶了，担心好朋友会因此讨厌这门课",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习计划 J/P",
            "description": "面对下周的大考。",
            "choices": [
                {
                    "text": "每天复习两个单元，严格按照计划表执行",
                    "trait": "J"
                },
                {
                    "text": "临考前一晚才觉得最有动力，通宵突击复习",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "课外扩展 S/N",
            "description": "看到一本关于“未来学校”的书。",
            "choices": [
                {
                    "text": "关注未来的教室里会有什么样的智能桌椅",
                    "trait": "S"
                },
                {
                    "text": "思考未来的教育是否还会需要老师和考试",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "课堂表现 E/I",
            "description": "老师在全班提问了一个很难的问题。",
            "choices": [
                {
                    "text": "马上举手，边想边说出自己的答案",
                    "trait": "E"
                },
                {
                    "text": "先在草稿纸上写出思路，确定没错再举手",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠错心态 T/F",
            "description": "老师把你的一道题改错了，其实你是对的。",
            "choices": [
                {
                    "text": "下课直接找老师理论，要求把分数改回来",
                    "trait": "T"
                },
                {
                    "text": "犹豫要不要找老师，怕老师尴尬或觉得自己太计较",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务截止 J/P",
            "description": "老师要求周五交一份手抄报。",
            "choices": [
                {
                    "text": "周三就画好了，甚至还多加了几种装饰",
                    "trait": "J"
                },
                {
                    "text": "周五早读课还在狂补颜色，甚至还没干透就交了",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美偏好 S/N",
            "description": "你理想中的图书馆：",
            "choices": [
                {
                    "text": "书架非常整齐，每个品类都有清晰的标签",
                    "trait": "S"
                },
                {
                    "text": "装修很有艺术感，有很多奇形怪状的阅读角",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "合作倾向 T/F",
            "description": "小组合作完成一个手工模型。",
            "choices": [
                {
                    "text": "选那个手工最厉害、能带大家拿高分的组长",
                    "trait": "T"
                },
                {
                    "text": "选那个脾气最好、能让大家都玩得开心的组长",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "阅读习惯 S/N",
            "description": "看历史故事书。",
            "choices": [
                {
                    "text": "记住每个朝代的具体年份和著名的将军名字",
                    "trait": "S"
                },
                {
                    "text": "思考如果历史在某个时刻改变了，现在会怎样",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "执行风格 J/P",
            "description": "参加社团的支教准备会。",
            "choices": [
                {
                    "text": "必须带好笔记本，记下所有重点任务",
                    "trait": "J"
                },
                {
                    "text": "觉得听一听就行，到时候根据实际情况发挥",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "社交能量 E/I",
            "description": "参加全校性质的学习分享会。",
            "choices": [
                {
                    "text": "积极找其他班的“学霸”交流心得，交换联系方式",
                    "trait": "E"
                },
                {
                    "text": "坐在角落，听完之后默默整理笔记回班级",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "反馈需求 T/F",
            "description": "老师给你的评语：",
            "choices": [
                {
                    "text": "“你的逻辑非常严密，学习方法很科学”",
                    "trait": "T"
                },
                {
                    "text": "“你是一个非常有爱心的孩子，总是帮助同学”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "未来规划 J/P",
            "description": "关于下学期的兴趣班。",
            "choices": [
                {
                    "text": "现在就已经选好了，并查好了上课的时间表",
                    "trait": "J"
                },
                {
                    "text": "等开学了看大家都选什么，或者到时候再看心情",
                    "trait": "P"
                }
            ]
        }
    ],
    "5": [
        {
            "title": "社交角色 E/I",
            "description": "组织“反对性别偏见”校园宣讲。",
            "choices": [
                {
                    "text": "站在国旗下演讲，向全校同学发出倡议",
                    "trait": "E"
                },
                {
                    "text": "负责在宣传栏张贴海报，或者在后台管音响",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "观察视角 S/N",
            "description": "看到操场上女生踢足球、男生跳皮筋。",
            "choices": [
                {
                    "text": "觉得这个画面很新奇，观察他们玩得顺不顺手",
                    "trait": "S"
                },
                {
                    "text": "联想到这就是“打破偏见”的最好例子，很有意义",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "矛盾处理 T/F",
            "description": "班里男生女生因为打扫卫生分工不匀吵架了。",
            "choices": [
                {
                    "text": "拿出一张表，按人数和工作量算出最公平的分配",
                    "trait": "T"
                },
                {
                    "text": "劝大家互相理解，男生多干点体力活，女生多负责细致活",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "活动习惯 J/P",
            "description": "策划社团的“性别平等小剧场”。",
            "choices": [
                {
                    "text": "必须先把剧本写死，每个人背熟台词再排练",
                    "trait": "J"
                },
                {
                    "text": "只有一个大纲，让大家现场即兴表演，看谁脑洞大",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "视野逻辑 S/N",
            "description": "谈到“未来的社会”。",
            "choices": [
                {
                    "text": "关注每个岗位的男女比例是否能达到 1:1",
                    "trait": "S"
                },
                {
                    "text": "憧憬一个不再以性别定义任何人的自由世界",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "互动风格 E/I",
            "description": "参加“平权青年论坛”。",
            "choices": [
                {
                    "text": "不停地提问，并试图说服反对自己观点的人",
                    "trait": "E"
                },
                {
                    "text": "安静倾听，只有在被要求分享时才精炼表达",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠错心态 T/F",
            "description": "老师说“男孩子不准哭，要坚强”。",
            "choices": [
                {
                    "text": "觉得这话逻辑不对，科学证明男生也有情感需求",
                    "trait": "T"
                },
                {
                    "text": "觉得这话伤了爱哭男生的心，心里感到酸酸的",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "社长要求这周末写完宣传推文。",
            "choices": [
                {
                    "text": "周六上午就发给社长审核了",
                    "trait": "J"
                },
                {
                    "text": "周日晚上 11 点还在赶稿，因为一直在找灵感",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美偏好 S/N",
            "description": "制作“性别平等”胸章。",
            "choices": [
                {
                    "text": "用红蓝各半的图案代表男女平等",
                    "trait": "S"
                },
                {
                    "text": "用一个破壳而出的图形象征打破枷锁",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "评价标准 T/F",
            "description": "选拔社团发言人。",
            "choices": [
                {
                    "text": "看谁的口才好、反应快、思维清晰",
                    "trait": "T"
                },
                {
                    "text": "看谁的性格温和、能照顾到不同群体的感受",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习习惯 S/N",
            "description": "阅读关于南丁格尔或居里夫人的传记。",
            "choices": [
                {
                    "text": "关注她们在实验室里的每一个具体细节和困难",
                    "trait": "S"
                },
                {
                    "text": "思考她们作为女性，在那个时代如何挑战传统",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "应变风格 J/P",
            "description": "原定的“性别平等”讲座嘉宾迟到了。",
            "choices": [
                {
                    "text": "感到很尴尬，不停地看表，觉得活动快砸了",
                    "trait": "J"
                },
                {
                    "text": "觉得无所谓，先带大家玩几个互动小游戏救场",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要邀请校长参加你们的活动。",
            "choices": [
                {
                    "text": "带着社员直接去校长室，面对面诚恳邀请",
                    "trait": "E"
                },
                {
                    "text": "认真写一封信放在校长的建议信箱里",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "反馈需求 T/F",
            "description": "同学评价你：",
            "choices": [
                {
                    "text": "“你是一个讲道理、有原则、很理智的人”",
                    "trait": "T"
                },
                {
                    "text": "“你是一个很体贴、很善良、很温暖的人”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "成就感知 J/P",
            "description": "看到活动顺利结束，垃圾也清扫干净了。",
            "choices": [
                {
                    "text": "感到很圆满，所有的流程都对上了，很舒服",
                    "trait": "J"
                },
                {
                    "text": "觉得意犹未尽，想立刻再策划一场更刺激的",
                    "trait": "P"
                }
            ]
        }
    ],
    "6": [
        {
            "title": "实验态度 S/N",
            "description": "在实验室测试校园不同地点的水质。",
            "choices": [
                {
                    "text": "严格记录试纸变色的深浅，对比标准比色卡",
                    "trait": "S"
                },
                {
                    "text": "思考如果全校水质改善了，会对大家健康有什么提升",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交表现 E/I",
            "description": "负责“节水知识”闯关游戏。",
            "choices": [
                {
                    "text": "在关卡处热情招呼同学：“快来闯关拿奖品！”",
                    "trait": "E"
                },
                {
                    "text": "负责登记中奖名单和分发礼品，不多说话",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "冲突决策 T/F",
            "description": "同学在水房玩水，把地板弄得很湿很滑。",
            "choices": [
                {
                    "text": "立即制止并通报给老师，认为安全规章最重要",
                    "trait": "T"
                },
                {
                    "text": "过去提醒他们别滑倒，并帮他们一起把水擦干",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "计划性 J/P",
            "description": "策划“校园厕所卫生大改造”计划。",
            "choices": [
                {
                    "text": "制定好详细的排班表，谁负责哪一层楼，写得清清楚楚",
                    "trait": "J"
                },
                {
                    "text": "告诉大家有空就去刷刷墙、贴贴画，随性美化",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "视野逻辑 S/N",
            "description": "看到关于“干旱地区缺水”的新闻。",
            "choices": [
                {
                    "text": "关注那个地区每人每天只能喝多少升水",
                    "trait": "S"
                },
                {
                    "text": "思考如果全球水资源枯竭，人类文明会如何延续",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "互动风格 E/I",
            "description": "参加全区中学生环保交流会。",
            "choices": [
                {
                    "text": "积极上台介绍自己社团的节水经验",
                    "trait": "E"
                },
                {
                    "text": "在台下默默听别人的经验，并记在小本子上",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠错逻辑 T/F",
            "description": "组员在统计水表度数时多写了一个零。",
            "choices": [
                {
                    "text": "必须让他当场重测，数据必须真实，不能造假",
                    "trait": "T"
                },
                {
                    "text": "觉得没关系，多写一点能显得大家节水任务很重",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "准备这学期的“护水员”日志。",
            "choices": [
                {
                    "text": "坚持每天记录，哪怕只有一句话",
                    "trait": "J"
                },
                {
                    "text": "攒到一个星期快结束时，再一次性补齐",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美偏好 S/N",
            "description": "设计节水宣传海报。",
            "choices": [
                {
                    "text": "画一个关不紧的水龙头在滴水的写实画",
                    "trait": "S"
                },
                {
                    "text": "画一只在大海里飞翔的凤凰，象征生命之源",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "评价标准 T/F",
            "description": "评价一次节水活动好不好。",
            "choices": [
                {
                    "text": "看学校这个月的自来水费账单降了多少",
                    "trait": "T"
                },
                {
                    "text": "看同学们在洗手时是不是更有节水意识了",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习习惯 S/N",
            "description": "学习水循环原理。",
            "choices": [
                {
                    "text": "先背熟蒸发、降水、地表径流这些词的具体定义",
                    "trait": "S"
                },
                {
                    "text": "联想水是如何在地球、大气和生命之间流转的",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "应变风格 J/P",
            "description": "准备好的宣传单在搬运路上弄湿了。",
            "choices": [
                {
                    "text": "感到很抓狂，觉得今天的活动全毁了",
                    "trait": "J"
                },
                {
                    "text": "觉得无所谓，顺便还能当反面教材讲讲水的作用",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要说服后勤大爷给厕所装感应水龙头。",
            "choices": [
                {
                    "text": "每天去大爷办公室磨，磨到大爷答应为止",
                    "trait": "E"
                },
                {
                    "text": "整理一份节水能省多少钱的对比数据发给后勤",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "反馈需求 T/F",
            "description": "被评为“节水小卫士”后，老师夸你：",
            "choices": [
                {
                    "text": "“你做事非常严谨，每个环节都处理得很到位”",
                    "trait": "T"
                },
                {
                    "text": "“你非常有社会责任感，是个充满正义感的孩子”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "理想追求 J/P",
            "description": "关于社团未来的目标。",
            "choices": [
                {
                    "text": "希望在 3 年内把全校的水龙头都换成节水型的",
                    "trait": "J"
                },
                {
                    "text": "希望在学校办一场前所未有的“水文化艺术节”",
                    "trait": "P"
                }
            ]
        }
    ],
    "7": [
        {
            "title": "实验细节 S/N",
            "description": "在“太阳能小车”工坊，你发现说明书少了一页。",
            "choices": [
                {
                    "text": "翻遍废纸篓也要找回那一页，按精确步骤组装",
                    "trait": "S"
                },
                {
                    "text": "观察已有零件，凭直觉推测缺失的动力连接逻辑",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交能量 E/I",
            "description": "社团要在校门口摆摊展示“手摇发电灯”。",
            "choices": [
                {
                    "text": "站在路中间大声招揽同学：“快来试一试，自己发电！”",
                    "trait": "E"
                },
                {
                    "text": "负责在后排调试设备，有人走近询问时再耐心解答",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "价值观 T/F",
            "description": "评审一个绿能创意，其中一个方案非常环保但制作极难。",
            "choices": [
                {
                    "text": "冷静分析其投入产出比，认为不具可行性，建议毙掉",
                    "trait": "T"
                },
                {
                    "text": "被选手的热情和创意初衷打动，想办法帮他精简方案",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "计划性 J/P",
            "description": "准备下周的“绿能实验室开放日”。",
            "choices": [
                {
                    "text": "这周五就定好导览路线、解说词和每组参观人数",
                    "trait": "J"
                },
                {
                    "text": "到时候看来了多少人再决定怎么带大家参观",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "视野逻辑 S/N",
            "description": "讨论“碳达峰”目标时。",
            "choices": [
                {
                    "text": "关注学校宿舍空调每晚能省几度电",
                    "trait": "S"
                },
                {
                    "text": "讨论 2030 年中国能源结构转型的宏观布局",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "互动风格 E/I",
            "description": "参加全省高校绿能论坛。",
            "choices": [
                {
                    "text": "积极加入各个讨论组，互换联系方式拓展人脉",
                    "trait": "E"
                },
                {
                    "text": "坐在最后一排，认真记录对自己有启发的观点",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠错逻辑 T/F",
            "description": "队友在连接电路时粗心导致跳闸。",
            "choices": [
                {
                    "text": "严肃指出他的违规操作，要求他重读安全手册",
                    "trait": "T"
                },
                {
                    "text": "先安慰受惊的队友，然后一起笑着排查问题",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "写一篇关于“氢能”的科普论文。",
            "choices": [
                {
                    "text": "每天写 500 字，雷打不动，提前三天写完",
                    "trait": "J"
                },
                {
                    "text": "先大量搜集素材，等到灵感爆发的那晚一气呵成",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美偏好 S/N",
            "description": "设计社团 Logo。",
            "choices": [
                {
                    "text": "必须包含闪电、叶子等具体的绿能元素",
                    "trait": "S"
                },
                {
                    "text": "倾向于简洁的线条组合，象征无限循环的能量",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "决策依据 T/F",
            "description": "社团要选新社长。",
            "choices": [
                {
                    "text": "看谁的科创比赛成绩最高、管理能力最强",
                    "trait": "T"
                },
                {
                    "text": "看谁在社团人缘最好、最能关心大家感受",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习习惯 S/N",
            "description": "学习核能原理。",
            "choices": [
                {
                    "text": "先记住核反应堆的构造和每一个零件名称",
                    "trait": "S"
                },
                {
                    "text": "先理解质能方程 $E=mc^2$ 背后深刻的科学逻辑",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "应变风格 J/P",
            "description": "演示实验器材突然坏了。",
            "choices": [
                {
                    "text": "感到头大，认为没检查到位是严重的失职",
                    "trait": "J"
                },
                {
                    "text": "觉得是小意外，当场即兴给观众讲讲器材原理",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要邀请一位老师做指导。",
            "choices": [
                {
                    "text": "直接冲进办公室，面对面诚恳表述想法",
                    "trait": "E"
                },
                {
                    "text": "反复修改邮件，通过文字阐述合作计划",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "竞争心态 T/F",
            "description": "参加节能比赛输给了对手。",
            "choices": [
                {
                    "text": "研究对手的方案，承认对方在逻辑和技术上的领先",
                    "trait": "T"
                },
                {
                    "text": "觉得自己这组配合得很温馨，虽败犹荣",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "反馈需求 E/I",
            "description": "获得“绿能先锋奖”后。",
            "choices": [
                {
                    "text": "朋友圈九宫格发图，回复每一条点赞评论",
                    "trait": "E"
                },
                {
                    "text": "默默把奖杯收进书柜，内心获得宁静的成就感",
                    "trait": "I"
                }
            ]
        }
    ],
    "8": [
        {
            "title": "模拟职场 E/I",
            "description": "模拟校园招聘现场，你负责签到处。",
            "choices": [
                {
                    "text": "热情迎接每位学长学姐，主动开启话题聊天",
                    "trait": "E"
                },
                {
                    "text": "严谨核对名单，礼貌点头示意，不多废话",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "职业分析 S/N",
            "description": "评价一份实习工作好不好。",
            "choices": [
                {
                    "text": "看工资高不高、午餐好不好吃、离学校近不近",
                    "trait": "S"
                },
                {
                    "text": "看这份工作是否有晋升空间、是否符合未来理想",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "压力应对 T/F",
            "description": "组员因为实习面试失败在办公室偷哭。",
            "choices": [
                {
                    "text": "给她递纸巾，并理智分析她失败的技术性原因",
                    "trait": "T"
                },
                {
                    "text": "陪她一起吐槽面试官，安慰她“那家公司配不上你”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "日程习惯 J/P",
            "description": "负责统计社团所有成员的课表以排班。",
            "choices": [
                {
                    "text": "制作精美的表格，要求大家周三前必须填完",
                    "trait": "J"
                },
                {
                    "text": "觉得没必要，每次活动前在群里吼一声谁有空就行",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "经济观点 S/N",
            "description": "讨论“斜杠青年”现象。",
            "choices": [
                {
                    "text": "关注他们如何平衡多份工作的收入和体力消耗",
                    "trait": "S"
                },
                {
                    "text": "探讨这种多元就业模式对未来社会结构的改变",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "团队角色 E/I",
            "description": "小组讨论“大学生创业”。",
            "choices": [
                {
                    "text": "不停输出观点，主导整个讨论节奏",
                    "trait": "E"
                },
                {
                    "text": "默默记录所有人的话，最后提出核心修正意见",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠纷处理 T/F",
            "description": "有人质疑社团经费分配不均。",
            "choices": [
                {
                    "text": "甩出清晰的 Excel 账单，用数据直接回击质疑",
                    "trait": "T"
                },
                {
                    "text": "组织大家聚餐谈心，化解社员心里的“委屈感”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务截止 J/P",
            "description": "距离提交创业计划书还有 1 小时。",
            "choices": [
                {
                    "text": "早就交了，现在正在悠闲地喝奶茶",
                    "trait": "J"
                },
                {
                    "text": "还在疯狂修改 PPT 背景色，享受肾上腺素飙升",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "职业理想 S/N",
            "description": "你的未来画像是：",
            "choices": [
                {
                    "text": "在知名大厂有一份稳定、高薪、清晰的岗位",
                    "trait": "S"
                },
                {
                    "text": "创建一个从未有过的行业，做第一个吃螃蟹的人",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "评价反馈 T/F",
            "description": "社长评价你的工作。",
            "choices": [
                {
                    "text": "“你的数据分析非常客观，逻辑满分”",
                    "trait": "T"
                },
                {
                    "text": "“你在这个项目中非常有团队精神，温暖了大家”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "管理风格 J/P",
            "description": "如果你是职创社社长。",
            "choices": [
                {
                    "text": "必须每周开例会，每个部室汇报进度",
                    "trait": "J"
                },
                {
                    "text": "没大事不开会，大家线上随时联系，自由度极高",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "社交倾向 E/I",
            "description": "晚上的职业规划讲座。",
            "choices": [
                {
                    "text": "必须坐第一排，结束后冲上去加讲师微信",
                    "trait": "E"
                },
                {
                    "text": "坐最后排，记下关键点后立刻撤退回寝室",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "思维模式 S/N",
            "description": "学习经济学原理。",
            "choices": [
                {
                    "text": "喜欢研究具体的案例，比如某奶茶店为什么倒闭",
                    "trait": "S"
                },
                {
                    "text": "喜欢推导宏观模型，比如供需平衡的数学曲线",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "激励方式 T/F",
            "description": "奖励优秀社员。",
            "choices": [
                {
                    "text": "发一张带有量化排名的荣誉证书",
                    "trait": "T"
                },
                {
                    "text": "给由于他辛苦付出而写的感谢信",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "行动逻辑 J/P",
            "description": "面对新的社团挑战。",
            "choices": [
                {
                    "text": "先搜集前三届的资料，按套路出牌",
                    "trait": "J"
                },
                {
                    "text": "直接上手干，遇到问题再临时解决",
                    "trait": "P"
                }
            ]
        }
    ],
    "9": [
        {
            "title": "拆解本能 S/N",
            "description": "看到实验室一个报废的 3D 打印机。",
            "choices": [
                {
                    "text": "想拆开看看传动皮带和电机是怎么连接的",
                    "trait": "S"
                },
                {
                    "text": "思考它的工作原理能不能应用到未来的建筑施工中",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交状态 E/I",
            "description": "举办“废旧零件创意拼装赛”。",
            "choices": [
                {
                    "text": "在各组间转悠，点评每一个脑洞大开的作品",
                    "trait": "E"
                },
                {
                    "text": "沉浸在自己的小世界里，尝试拼一个复杂的机械臂",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "冲突决策 T/F",
            "description": "两个组员因为技术路线争执不下。",
            "choices": [
                {
                    "text": "让他们各自写出逻辑推导，用事实证明谁对",
                    "trait": "T"
                },
                {
                    "text": "劝大家各退一步，把两个人的方案融合一下",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "时间管理 J/P",
            "description": "开发社团的“物资借用小程序”。",
            "choices": [
                {
                    "text": "严格划分 UI 设计、前端、后端，每天检查进度",
                    "trait": "J"
                },
                {
                    "text": "随性写代码，写到哪算哪，功能慢慢补全",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美取向 S/N",
            "description": "评价一个科创作品。",
            "choices": [
                {
                    "text": "每一个焊点是否美观、外壳是否结实耐用",
                    "trait": "S"
                },
                {
                    "text": "这个作品背后的核心逻辑是否具备“颠覆性”",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "活动偏好 E/I",
            "description": "参加全国科创大赛开幕式。",
            "choices": [
                {
                    "text": "积极主动去找外校同学合影、换胸卡",
                    "trait": "E"
                },
                {
                    "text": "躲在休息区，研究比赛手册里的技术参数",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "沟通习惯 T/F",
            "description": "面对社友一个很不靠谱的创新想法。",
            "choices": [
                {
                    "text": "直接打断：“这违反物理常识，没戏。”",
                    "trait": "T"
                },
                {
                    "text": "鼓励他：“想法很有趣，虽然实现起来有点难。”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "工作节奏 J/P",
            "description": "实验室卫生打扫。",
            "choices": [
                {
                    "text": "规定每周五下午 4 点，所有人必须到场",
                    "trait": "J"
                },
                {
                    "text": "随心而定，大家看桌子实在太乱了就顺手擦擦",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "视野逻辑 S/N",
            "description": "讨论“智能校园建设”。",
            "choices": [
                {
                    "text": "建议在食堂加装自动打饭机，减少排队时间",
                    "trait": "S"
                },
                {
                    "text": "建议构建全校物联网，实现全场景数据实时共享",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "情绪反馈 T/F",
            "description": "熬夜做的机器人模型在比赛中摔坏了。",
            "choices": [
                {
                    "text": "冷静复盘：是重力感应器逻辑没写对",
                    "trait": "T"
                },
                {
                    "text": "感到心疼和沮丧：这是大家半个月的心血",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "社交能量 E/I",
            "description": "实验室里人声鼎沸。",
            "choices": [
                {
                    "text": "感觉充满了创造的灵感和动力",
                    "trait": "E"
                },
                {
                    "text": "感觉脑仁疼，想带电脑去图书馆写代码",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务处理 J/P",
            "description": "收到一个新的科创任务。",
            "choices": [
                {
                    "text": "立刻建文档、拉群、定 DDL",
                    "trait": "J"
                },
                {
                    "text": "先去搜资料，或者先玩会游戏构思构思",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "学习风格 S/N",
            "description": "学习 Python 编程。",
            "choices": [
                {
                    "text": "喜欢跟着课本一行一行敲代码，看运行结果",
                    "trait": "S"
                },
                {
                    "text": "喜欢直接看核心逻辑架构，然后自己尝试复现",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "团队态度 T/F",
            "description": "评价一位合作社员。",
            "choices": [
                {
                    "text": "“他是个技术大牛，能解决所有 Bug”",
                    "trait": "T"
                },
                {
                    "text": "“他是个灵魂人物，能让大家都团结在一起”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "成就感知 J/P",
            "description": "看到实验室被整理得井井有条。",
            "choices": [
                {
                    "text": "感到极大的心理舒适和成就感",
                    "trait": "J"
                },
                {
                    "text": "觉得没啥感觉，甚至觉得有点太拘束了",
                    "trait": "P"
                }
            ]
        }
    ],
    "10": [
        {
            "title": "社交方式 E/I",
            "description": "组织“残障体验”后的分享会。",
            "choices": [
                {
                    "text": "带头分享感悟，并鼓励每个沉默的社员发言",
                    "trait": "E"
                },
                {
                    "text": "在记录本上写下长长的感悟，等别人点名再说",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "认知深度 S/N",
            "description": "体验蒙眼走路。",
            "choices": [
                {
                    "text": "关注哪里的台阶太高、哪里的声音太吵",
                    "trait": "S"
                },
                {
                    "text": "思考社会为何在建筑设计中缺乏对人的关怀",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "价值观冲突 T/F",
            "description": "讨论是否给家庭困难社员发放额外零食。",
            "choices": [
                {
                    "text": "反对，认为社团规则应当对所有人完全对等",
                    "trait": "T"
                },
                {
                    "text": "支持，认为照顾弱势群体才是真正的公平",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "习惯风格 J/P",
            "description": "策划一场针对全校的“反偏见”展览。",
            "choices": [
                {
                    "text": "精确到每个展位贴什么海报、谁负责引导",
                    "trait": "J"
                },
                {
                    "text": "只定好核心区域，剩下的让社员自由发挥布置",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "共情反馈 T/F",
            "description": "看到有人在网上发布歧视言论。",
            "choices": [
                {
                    "text": "截图并写出一篇逻辑严密的法律反驳推文",
                    "trait": "T"
                },
                {
                    "text": "感到非常愤慨和难过，想联系受害者给予安慰",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "信息获取 S/N",
            "description": "宣传减少地区差距。",
            "choices": [
                {
                    "text": "拿出各个省份的人均 GDP 对比图",
                    "trait": "S"
                },
                {
                    "text": "分享一个关于“数字鸿沟”的寓言故事",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "互动能量 E/I",
            "description": "活动后的庆功宴。",
            "choices": [
                {
                    "text": "穿梭在酒席间（或奶茶店）说笑，全场焦点",
                    "trait": "E"
                },
                {
                    "text": "坐在角落，和身边的死党聊聊刚才的心得",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "规则执行 J/P",
            "description": "统计活动学分时。",
            "choices": [
                {
                    "text": "严格对照考勤表，少 1 分钟都不能通过",
                    "trait": "J"
                },
                {
                    "text": "觉得大家来参加了就很棒，没必要太死板",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "评价标准 T/F",
            "description": "评价社团影响力。",
            "choices": [
                {
                    "text": "提交的提案被学校采纳了多少条",
                    "trait": "T"
                },
                {
                    "text": "帮助了多少边缘同学重拾了自信",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "沟通偏好 E/I",
            "description": "想要宣传“公平”。",
            "choices": [
                {
                    "text": "去每个班级做巡回演讲",
                    "trait": "E"
                },
                {
                    "text": "制作一套精美的匿名“公平”明信片发放",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "思维取向 S/N",
            "description": "面对校园不平等。",
            "choices": [
                {
                    "text": "关注具体的某次奖学金评定不公",
                    "trait": "S"
                },
                {
                    "text": "思考这种不公产生的制度性根源",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "组织态度 J/P",
            "description": "社团面临紧急任务。",
            "choices": [
                {
                    "text": "迅速召集核心成员，开短会定计划",
                    "trait": "J"
                },
                {
                    "text": "在群里喊一声“谁有空谁搞一下”，随缘分工",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "情绪共鸣 T/F",
            "description": "听到贫困地区孩子的故事。",
            "choices": [
                {
                    "text": "考虑这个故事在宣传中是否具备典型性",
                    "trait": "T"
                },
                {
                    "text": "瞬间热泪盈眶，想立刻捐款",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "协作习惯 E/I",
            "description": "小组作业。",
            "choices": [
                {
                    "text": "喜欢大家聚在一起，一边吃零食一边讨论",
                    "trait": "E"
                },
                {
                    "text": "喜欢大家先各自查资料，最后开个简短会同步",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "理想追求 S/N",
            "description": "你希望社团未来：",
            "choices": [
                {
                    "text": "建成全国最大的校园互助志愿者网络",
                    "trait": "S"
                },
                {
                    "text": "成为一种传递“人类平等”火种的精神象征",
                    "trait": "N"
                }
            ]
        }
    ],
    "11": [
        {
            "title": "细节感知 S/N",
            "description": "走进一个老旧社区做改造规划。",
            "choices": [
                {
                    "text": "盯着墙上的裂缝、生锈的扶手和垃圾桶位置",
                    "trait": "S"
                },
                {
                    "text": "脑补这里加了咖啡店和书屋后的社区文化氛围",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交角色 E/I",
            "description": "为了调研，需要敲开陌生住户的门。",
            "choices": [
                {
                    "text": "敲门、微笑、介绍自己一气呵成，毫不尴尬",
                    "trait": "E"
                },
                {
                    "text": "在门外深吸三口气，心跳加速，反复核对台词",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "决策逻辑 T/F",
            "description": "社区空地是修车位还是种花？",
            "choices": [
                {
                    "text": "修车位，解决最紧迫、最现实的停车难问题",
                    "trait": "T"
                },
                {
                    "text": "种花，让邻居们心情变好，提升社区幸福感",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "工作模式 J/P",
            "description": "社团组织的“墙绘美化”活动。",
            "choices": [
                {
                    "text": "每个参与者必须按照草图的颜色编号涂抹",
                    "trait": "J"
                },
                {
                    "text": "给大家颜色，让大家在墙上自由泼墨创作",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "关注重点 T/F",
            "description": "评价你的寝室生活。",
            "choices": [
                {
                    "text": "寝室公约是否执行到位，分工是否科学",
                    "trait": "T"
                },
                {
                    "text": "寝室室友感情是否深厚，氛围是否和谐",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习偏好 S/N",
            "description": "听城市规划课。",
            "choices": [
                {
                    "text": "喜欢听具体的交通枢纽设计和管网布局",
                    "trait": "S"
                },
                {
                    "text": "喜欢听“未来主义建筑”和“赛博朋克城市”构想",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交习惯 E/I",
            "description": "晚上有社区广场舞活动。",
            "choices": [
                {
                    "text": "跟着节奏一起跳，迅速和邻居大妈打成一片",
                    "trait": "E"
                },
                {
                    "text": "远远看着，记录这种社会融入的有趣现象",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "为社区办一份报纸。",
            "choices": [
                {
                    "text": "定好周刊，每周五必须雷打不动准时发刊",
                    "trait": "J"
                },
                {
                    "text": "定好不定期刊，什么时候有大新闻什么时候出",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "冲突反馈 T/F",
            "description": "社区两个邻居因为噪音吵架。",
            "choices": [
                {
                    "text": "拿出分贝仪和法律条文，理智判定责任方",
                    "trait": "T"
                },
                {
                    "text": "帮两家人做心理疏导，化解多年的积怨",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "信息传播 E/I",
            "description": "宣传“宜居校园”。",
            "choices": [
                {
                    "text": "开一场动员大会，号召全校共建",
                    "trait": "E"
                },
                {
                    "text": "制作一套唯美的校园风景手账，小范围传阅",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "习惯取向 S/N",
            "description": "搬进新寝室。",
            "choices": [
                {
                    "text": "必须买齐全套收纳盒，让东西各归其位",
                    "trait": "S"
                },
                {
                    "text": "先买个投影仪或挂一张有深度的海报",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "变化应对 J/P",
            "description": "原定的社区义诊因为医生有事取消了。",
            "choices": [
                {
                    "text": "感到计划被打乱很沮丧，想投诉相关人员",
                    "trait": "J"
                },
                {
                    "text": "趁机搞个“应急急救知识讲座”，见招拆招",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "价值判断 T/F",
            "description": "你更支持：",
            "choices": [
                {
                    "text": "智慧城市：通过 AI 大脑实现极致效率",
                    "trait": "T"
                },
                {
                    "text": "共享城市：通过空间共融实现邻里友善",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要改进校门口的交通。",
            "choices": [
                {
                    "text": "站在路口做志愿者指引，边干边总结问题",
                    "trait": "E"
                },
                {
                    "text": "写一份详细的交通优化提案交给校管会",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务量级 S/N",
            "description": "社团下周目标：",
            "choices": [
                {
                    "text": "把社区 10 个楼道的扶手擦亮",
                    "trait": "S"
                },
                {
                    "text": "策划一个“社区历史回忆”主题影展",
                    "trait": "N"
                }
            ]
        }
    ],
    "12": [
        {
            "title": "购物逻辑 T/F",
            "description": "买文具时。",
            "choices": [
                {
                    "text": "算单价、算耐用度，挑性价比最高的那个",
                    "trait": "T"
                },
                {
                    "text": "挑那个不仅好看，而且品牌承诺环保减塑的",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "社交表现 E/I",
            "description": "负责跳蚤市场的“拍卖”环节。",
            "choices": [
                {
                    "text": "拿着小木槌在台上激昂叫价，气氛拉满",
                    "trait": "E"
                },
                {
                    "text": "在台下给拍卖品拍照、传图、写说明文案",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "计划性 J/P",
            "description": "策划“双 11 断舍离”活动。",
            "choices": [
                {
                    "text": "详细规定哪些东西能捐、哪些能卖，并贴标签",
                    "trait": "J"
                },
                {
                    "text": "随大家拿东西来，边卖边根据行情改价格",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "思维视角 S/N",
            "description": "看到食堂里有人浪费粮食。",
            "choices": [
                {
                    "text": "自动计算这盘菜值多少钱，浪费了多少劳动",
                    "trait": "S"
                },
                {
                    "text": "联想到全球供应链的压力和极地融化的危机",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "反馈心态 T/F",
            "description": "同学买了一个过度包装的网红产品。",
            "choices": [
                {
                    "text": "直言不讳：“你这是在为无意义的塑料买单。”",
                    "trait": "T"
                },
                {
                    "text": "委婉暗示：“这个包装很好看，但其实挺可惜的。”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "社交倾向 E/I",
            "description": "社团举办“旧衣改造”工作坊。",
            "choices": [
                {
                    "text": "边缝纫边跟身边的社员聊天，讨论穿搭",
                    "trait": "E"
                },
                {
                    "text": "一个人静静研究针法，把衣服改出独特风格",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "应变逻辑 J/P",
            "description": "跳蚤市场突然下暴雨。",
            "choices": [
                {
                    "text": "迅速指挥大家按“雨天应急流程”收摊撤离",
                    "trait": "J"
                },
                {
                    "text": "干脆搞个“雨中大甩卖”，越湿越便宜",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美逻辑 S/N",
            "description": "宣传可持续生活。",
            "choices": [
                {
                    "text": "罗列一堆“节约用水 10 个小妙招”",
                    "trait": "S"
                },
                {
                    "text": "策划一个“极简主义生活美学”讲座",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "评价决策 T/F",
            "description": "要不要和某个奶茶品牌合作？",
            "choices": [
                {
                    "text": "看它能给社团带来多少奖品和资金赞助",
                    "trait": "T"
                },
                {
                    "text": "看它的环保理念是否和社团百分百契合",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "习惯取向 J/P",
            "description": "寝室里的快递纸盒。",
            "choices": [
                {
                    "text": "拆一个叠好一个，定时统一送到回收点",
                    "trait": "J"
                },
                {
                    "text": "攒一大堆，等哪天心情好或者没地方站了再弄",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "沟通能量 E/I",
            "description": "为了减少塑料袋，去校内超市当说客。",
            "choices": [
                {
                    "text": "和收银员大叔热聊半天，推销环保理念",
                    "trait": "E"
                },
                {
                    "text": "给超市经理写一封逻辑缜密的减塑建议信",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务量级 S/N",
            "description": "社团目标：",
            "choices": [
                {
                    "text": "统计全校每天产生多少吨垃圾",
                    "trait": "S"
                },
                {
                    "text": "改变全校同学的过度消费心理",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "决策逻辑 T/F",
            "description": "奖学金发了。",
            "choices": [
                {
                    "text": "存起来，或者买个学习需要的实用大件",
                    "trait": "T"
                },
                {
                    "text": "请大家吃顿好的，或者买个心心念念的潮玩",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "社交风格 E/I",
            "description": "社团聚会玩桌游。",
            "choices": [
                {
                    "text": "喜欢热闹的、需要一直说话的狼人杀",
                    "trait": "E"
                },
                {
                    "text": "喜欢安静的、需要逻辑思考的硬核剧本杀",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "完成目标 J/P",
            "description": "一个月的“零垃圾挑战”结束了。",
            "choices": [
                {
                    "text": "哪怕最后一天很难受，也坚持按规则完成",
                    "trait": "J"
                },
                {
                    "text": "差不多就行了，中途有几天忘了记也不算失败",
                    "trait": "P"
                }
            ]
        }
    ],
    "13": [
        {
            "title": "实验分析 S/N",
            "description": "社团测量校园不同地表的温度差异。",
            "choices": [
                {
                    "text": "盯着温湿度计上的数字，精确记录沥青路和草地的温差",
                    "trait": "S"
                },
                {
                    "text": "思考这些数据如何证明城市热岛效应正在改变微气候",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "演讲准备 E/I",
            "description": "学校举办“气候变化”主题辩论赛。",
            "choices": [
                {
                    "text": "享受在辩论台上唇枪舌战，用感染力说服评委",
                    "trait": "E"
                },
                {
                    "text": "负责在台下搜集证据，整理逻辑严密的辩论大纲",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "价值观 T/F",
            "description": "看到有人为了凉快，在空无一人的教室整夜开空调。",
            "choices": [
                {
                    "text": "直接向教务处举报这种违反能源规定的行为",
                    "trait": "T"
                },
                {
                    "text": "先去关掉空调，并在群里发个温柔的提醒，怕大家被通报批评",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "策划“低碳一周挑战赛”。",
            "choices": [
                {
                    "text": "周一到周五每天打卡内容必须严格执行，不能漏掉",
                    "trait": "J"
                },
                {
                    "text": "大家根据自己的课表灵活打卡，只要一周内做够 5 件事就行",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "视野逻辑 S/N",
            "description": "看到极端天气预警（如暴雨或干旱）。",
            "choices": [
                {
                    "text": "担心明天的体育课会不会取消，或者宿舍会不会断电",
                    "trait": "S"
                },
                {
                    "text": "感叹全球气候失调已经到了临界点，思考人类的未来",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "互动风格 E/I",
            "description": "为了推广碳中和，去每个寝室发宣传单。",
            "choices": [
                {
                    "text": "每进一个门都兴致勃勃地和室友们聊上几句",
                    "trait": "E"
                },
                {
                    "text": "把传单塞进门缝，或者只发给熟悉的同学",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠错逻辑 T/F",
            "description": "志愿者在统计碳足迹时算错了一个单位。",
            "choices": [
                {
                    "text": "必须让他重新算一遍，数据不容许任何煽情性的夸大",
                    "trait": "T"
                },
                {
                    "text": "觉得没关系，只要能起到宣传环保的效果就行",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "日程习惯 J/P",
            "description": "社团要拍一支关于气候的短视频。",
            "choices": [
                {
                    "text": "必须先写好脚本、分镜、定好拍摄时间表",
                    "trait": "J"
                },
                {
                    "text": "拿上手机去校园里乱逛，捕捉到什么灵感就拍什么",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美偏好 S/N",
            "description": "设计社团的文化衫。",
            "choices": [
                {
                    "text": "印上北极熊站在碎冰上的写实照片",
                    "trait": "S"
                },
                {
                    "text": "印上一个抽象的绿色漩涡，象征地球的呼吸",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "决策依据 T/F",
            "description": "选出“气候大使”。",
            "choices": [
                {
                    "text": "选那个发表过相关论文、拿过奖的高材生",
                    "trait": "T"
                },
                {
                    "text": "选那个对环保最有热情、最能带动大家情绪的伙伴",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习习惯 S/N",
            "description": "听关于“极端天气”的专题讲座。",
            "choices": [
                {
                    "text": "记录下每一次飓风的名字和发生的具体年份",
                    "trait": "S"
                },
                {
                    "text": "思考大气环流变化的底层动力学逻辑",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "应变风格 J/P",
            "description": "户外宣传时突然下雨。",
            "choices": [
                {
                    "text": "感到很丧，觉得一天的计划全毁了",
                    "trait": "J"
                },
                {
                    "text": "觉得这是“沉浸式”体验气候变化的好机会，继续干",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要号召全校师生熄灯一小时。",
            "choices": [
                {
                    "text": "在食堂门口架起麦克风，激情演讲征集签名",
                    "trait": "E"
                },
                {
                    "text": "制作一个精美的 H5 页面，在社交平台静默转发",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "竞争心态 T/F",
            "description": "在环保知识竞赛中输给了隔壁班。",
            "choices": [
                {
                    "text": "复盘自己哪里背得不准，下次一定要在逻辑上赢回来",
                    "trait": "T"
                },
                {
                    "text": "觉得重在参与，在这个过程中交到了好朋友就很开心",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "反馈需求 E/I",
            "description": "策划的活动被校报报道了。",
            "choices": [
                {
                    "text": "给每个帮忙转发的朋友发私信表示感谢",
                    "trait": "E"
                },
                {
                    "text": "安静地把报纸剪下来贴在日记本里留念",
                    "trait": "I"
                }
            ]
        }
    ],
    "14": [
        {
            "title": "科普细节 S/N",
            "description": "在“海洋生物展览”导览时。",
            "choices": [
                {
                    "text": "准确叫出每一种深海鱼的名字、长度和寿命",
                    "trait": "S"
                },
                {
                    "text": "向同学们描述海洋作为“地球之肺”的神奇循环",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交表现 E/I",
            "description": "举办“人鱼公主/王子”环保选拔赛。",
            "choices": [
                {
                    "text": "担任主持人，在台上幽默控场，调动气氛",
                    "trait": "E"
                },
                {
                    "text": "负责后台妆造和音效，确保每个流程不出错",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "计划性 J/P",
            "description": "社团准备去校外湿地观察水鸟和水下植物。",
            "choices": [
                {
                    "text": "提前定好望远镜、记录本和精确的班车往返时间",
                    "trait": "J"
                },
                {
                    "text": "到地方再说，看哪片水域漂亮就去哪儿蹲守",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "价值观 T/F",
            "description": "看到食堂供应来源不明的珍惜鱼类。",
            "choices": [
                {
                    "text": "收集证据向学校膳食委员会提交正式的举报信",
                    "trait": "T"
                },
                {
                    "text": "觉得可能只是误会，私下找食堂大叔建议换个菜谱",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "思维视角 S/N",
            "description": "谈到微塑料污染。",
            "choices": [
                {
                    "text": "关心它会如何影响我们每天喝的矿泉水质量",
                    "trait": "S"
                },
                {
                    "text": "担忧整个海洋生态链的崩溃和物种大灭绝",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "互动风格 E/I",
            "description": "社团要在校园喷泉池搞个“模拟珊瑚礁”展示。",
            "choices": [
                {
                    "text": "积极拉住路人，请他们给珊瑚“涂色”互动",
                    "trait": "E"
                },
                {
                    "text": "认真写每一块展示牌，让科普内容更深邃",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "纠错逻辑 T/F",
            "description": "组员在海报上把“鲸鱼”写成了“鱼类”（鲸是哺乳动物）。",
            "choices": [
                {
                    "text": "严肃指出这种常识错误会降低社团的专业性",
                    "trait": "T"
                },
                {
                    "text": "觉得没关系，反正普通人也看不太出来，不用重印",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "写一篇关于“珊瑚白化”的推文。",
            "choices": [
                {
                    "text": "列好一、二、三点大纲，按逻辑顺序码字",
                    "trait": "J"
                },
                {
                    "text": "先找漂亮的配图，根据图的意境即兴写文字",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "审美偏好 S/N",
            "description": "设计社团吉祥物。",
            "choices": [
                {
                    "text": "一个Q版的、看得出具体品种的小海龟",
                    "trait": "S"
                },
                {
                    "text": "一个发光的、象征海洋灵魂的神秘水母图形",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "决策依据 T/F",
            "description": "选社团年度优秀成员。",
            "choices": [
                {
                    "text": "奖励那个完成任务最高效、从不出错的成员",
                    "trait": "T"
                },
                {
                    "text": "奖励那个总能在同伴低落时给鼓励的“小太阳”",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习习惯 S/N",
            "description": "学习洋流知识。",
            "choices": [
                {
                    "text": "先画出世界地图，标出每一条暖流和寒流的名字",
                    "trait": "S"
                },
                {
                    "text": "先思考地球自转、温差如何共同驱动这个巨大系统",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "应变风格 J/P",
            "description": "计划好的海滩捡垃圾活动因为学校查寝推迟了。",
            "choices": [
                {
                    "text": "感到计划被破坏，非常生气，一直看表",
                    "trait": "J"
                },
                {
                    "text": "觉得晚点去也行，正好可以在寝室先看个海洋纪录片",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要邀请专业潜水员来校做分享。",
            "choices": [
                {
                    "text": "托各种关系找对方电话，直接打电话过去沟通",
                    "trait": "E"
                },
                {
                    "text": "先关注对方社交账号，通过私信礼貌表达意图",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "竞争心态 T/F",
            "description": "在社团评比中输给了“山林社”。",
            "choices": [
                {
                    "text": "认为我们的活动逻辑没问题，可能是评分标准偏颇",
                    "trait": "T"
                },
                {
                    "text": "真心为山林社高兴，并想找他们联谊庆祝",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "反馈需求 E/I",
            "description": "看到自己画的海洋海报被贴在校门口。",
            "choices": [
                {
                    "text": "拉着好哥们/好闺蜜去海报前打卡合影",
                    "trait": "E"
                },
                {
                    "text": "远远看一眼，确认没贴歪就满足地走开",
                    "trait": "I"
                }
            ]
        }
    ],
    "15": [
        {
            "title": "细节感知 S/N",
            "description": "跟着导师在后山做植物普查。",
            "choices": [
                {
                    "text": "注意叶片的形状、边缘是否有锯齿、根茎的质地",
                    "trait": "S"
                },
                {
                    "text": "感叹这个生态系统的多样性，思考物种入侵的可能",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交角色 E/I",
            "description": "举办“校园流浪猫普查”活动。",
            "choices": [
                {
                    "text": "成立“撸猫小组”，大声招呼志愿者加入",
                    "trait": "E"
                },
                {
                    "text": "负责建立流浪猫档案，录入照片和健康状况",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "决策逻辑 T/F",
            "description": "发现一只受伤的流浪狗需要花大笔经费。",
            "choices": [
                {
                    "text": "提议先众筹，但如果钱不够应考虑社团承受力，理性止损",
                    "trait": "T"
                },
                {
                    "text": "无论如何也要救它，哪怕自己省吃俭用也要给它治病",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "工作模式 J/P",
            "description": "组织“山间垃圾清理”活动。",
            "choices": [
                {
                    "text": "划分 A、B、C 区，每个人必须清理完自己的包干区",
                    "trait": "J"
                },
                {
                    "text": "大家随缘走，看到哪里脏就捡哪里，随性探索",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "关注重点 T/F",
            "description": "评价社团的每一次行动。",
            "choices": [
                {
                    "text": "是否达到了预定的环保指标（如树苗成活率）",
                    "trait": "T"
                },
                {
                    "text": "大家在爬山种树的过程中是否增强了凝聚力",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习偏好 S/N",
            "description": "学习生物进化论。",
            "choices": [
                {
                    "text": "喜欢看达尔文当年观察到的各种雀鸟喙部的细节",
                    "trait": "S"
                },
                {
                    "text": "喜欢思考“适者生存”这种宏大的生命规律",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交习惯 E/I",
            "description": "遇到不爱护草坪、乱踩花草的同学。",
            "choices": [
                {
                    "text": "直接走过去制止，并当众讲解草坪的重要性",
                    "trait": "E"
                },
                {
                    "text": "默默在草坪边竖起一块更有创意的警示牌",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "准备社团招新 PPT。",
            "choices": [
                {
                    "text": "提前排练三次，确保每一页的时长都刚好",
                    "trait": "J"
                },
                {
                    "text": "只准备大概框架，上台后根据台下新生的反应即兴说",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "冲突反馈 T/F",
            "description": "有人建议把社团活动改成更有趣的野餐。",
            "choices": [
                {
                    "text": "反对，认为这会消解社团的专业性，增加环卫负担",
                    "trait": "T"
                },
                {
                    "text": "觉得可以，这样能吸引更多人，氛围也更轻松",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "信息传播 E/I",
            "description": "宣传“近郊森林防火”。",
            "choices": [
                {
                    "text": "组织志愿者去附近村庄挨家挨户敲门宣传",
                    "trait": "E"
                },
                {
                    "text": "制作一套精美的动植物明信片，附带防火小知识",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "习惯取向 S/N",
            "description": "暑假去大自然旅行。",
            "choices": [
                {
                    "text": "带上全套装备：指南针、冲锋衣、高能饼干",
                    "trait": "S"
                },
                {
                    "text": "只带一颗探索的心，甚至没定具体的酒店",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "变化应对 J/P",
            "description": "预报有雨，原定的观鸟活动可能取消。",
            "choices": [
                {
                    "text": "觉得一天的心情都被破坏了，非常排斥改变",
                    "trait": "J"
                },
                {
                    "text": "觉得雨中观鸟可能更有趣，或者改去室内博物馆",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "价值判断 T/F",
            "description": "面对物种灭绝。",
            "choices": [
                {
                    "text": "思考这会对人类的制药或科研造成多大损失",
                    "trait": "T"
                },
                {
                    "text": "感到一个独立生命的消失是宇宙中极大的悲哀",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要号召学校食堂停用一次性筷子。",
            "choices": [
                {
                    "text": "在食堂门口搞联名签署，人越多越带劲",
                    "trait": "E"
                },
                {
                    "text": "写一份详细的成本调研报告直接发给校长邮箱",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务量级 S/N",
            "description": "下次活动计划：",
            "choices": [
                {
                    "text": "给学校 50 棵古树挂上带二维码的身份牌",
                    "trait": "S"
                },
                {
                    "text": "策划一场“万物有灵”的森林沉浸式艺术展",
                    "trait": "N"
                }
            ]
        }
    ],
    "16": [
        {
            "title": "细节感知 S/N",
            "description": "在“普法知识竞赛”出题。",
            "choices": [
                {
                    "text": "纠结于法律条文中的每一个字眼是否严谨、准确",
                    "trait": "S"
                },
                {
                    "text": "思考这些法律背后的公平正义逻辑是否经得起推敲",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交角色 E/I",
            "description": "举办“校园反诈骗”情景剧。",
            "choices": [
                {
                    "text": "争着演那个狡猾的骗子或正义的警察，表演欲爆棚",
                    "trait": "E"
                },
                {
                    "text": "负责写剧本里的逻辑反转，或者在台下管灯光",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "决策逻辑 T/F",
            "description": "发现社团内部有人为了评奖学金伪造考勤。",
            "choices": [
                {
                    "text": "绝对零容忍，立刻取消资格并全社通报，以示公正",
                    "trait": "T"
                },
                {
                    "text": "先找他谈话，了解他的难处，希望他能主动退回",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "工作模式 J/P",
            "description": "组织“模拟法庭”活动。",
            "choices": [
                {
                    "text": "法官、律师、证人必须按照剧本和流程，一秒都不能乱",
                    "trait": "J"
                },
                {
                    "text": "只定好证据，让大家在庭审中自由辩论，看谁反应快",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "关注重点 T/F",
            "description": "评价一次普法活动。",
            "choices": [
                {
                    "text": "现场是否逻辑闭环，法律常识是否传达准确",
                    "trait": "T"
                },
                {
                    "text": "同学们是否听得进去，有没有感受到被保护的安全感",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习偏好 S/N",
            "description": "学习中国法制史。",
            "choices": [
                {
                    "text": "记忆各个朝代的官职名称和酷刑种类",
                    "trait": "S"
                },
                {
                    "text": "思考“法治”如何从人治进化到文明社会的制度保障",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交习惯 E/I",
            "description": "为了解决寝室矛盾，社团派你去调解。",
            "choices": [
                {
                    "text": "组织双方坐在一起，你作为中间人大声调停",
                    "trait": "E"
                },
                {
                    "text": "先分别找双方私聊，在安静的氛围下解决分歧",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "撰写社团年度合规报告。",
            "choices": [
                {
                    "text": "严格按照目录排版，提前两周开始动笔",
                    "trait": "J"
                },
                {
                    "text": "随手记录各种发生的事件，最后一天才整合排版",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "冲突反馈 T/F",
            "description": "当法律规定与个人情感发生冲突时。",
            "choices": [
                {
                    "text": "坚持法理高于一切，个人情感必须服从集体正义",
                    "trait": "T"
                },
                {
                    "text": "认为法律应当有温度，在人性面前应当有裁量权",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "信息传播 E/I",
            "description": "宣传“世界和平日”。",
            "choices": [
                {
                    "text": "举办大型的草坪集会，大家一起放飞和平鸽",
                    "trait": "E"
                },
                {
                    "text": "策划一个“静默读书会”，读战争相关的深刻反思",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "习惯取向 S/N",
            "description": "看到校园里的规则（如不准带外卖进校）。",
            "choices": [
                {
                    "text": "仔细看告示牌上的每一条规定和违规后果",
                    "trait": "S"
                },
                {
                    "text": "思考这些规则设立的合理性及其对学生权力的平衡",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "变化应对 J/P",
            "description": "“模拟法庭”的嘉宾临时换人了。",
            "choices": [
                {
                    "text": "感到极度不安，觉得整个准备好的逻辑全乱了",
                    "trait": "J"
                },
                {
                    "text": "觉得没关系，换个风格也许更有碰撞感，直接上",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "价值判断 T/F",
            "description": "如果你当了法官，你追求：",
            "choices": [
                {
                    "text": "法律的权威性：公正无私，铁面无情",
                    "trait": "T"
                },
                {
                    "text": "社会的复原性：化解仇恨，重修旧好",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要改善学校的投诉反馈机制。",
            "choices": [
                {
                    "text": "带着社员去和学生会主席当面辩论、要求改革",
                    "trait": "E"
                },
                {
                    "text": "默默整理了 100 份问卷调查，用数据说话提交报告",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务量级 S/N",
            "description": "社团下周目标：",
            "choices": [
                {
                    "text": "给全校 2000 人发放反霸凌手册",
                    "trait": "S"
                },
                {
                    "text": "讨论“人工智能时代”的隐私权保护难题",
                    "trait": "N"
                }
            ]
        }
    ],
    "17": [
        {
            "title": "细节感知 S/N",
            "description": "在“跨社团资源对接会”上。",
            "choices": [
                {
                    "text": "关注每个社团能提供多少活动经费、多少桌椅设备",
                    "trait": "S"
                },
                {
                    "text": "关注不同社团理念碰撞后，可能产生的全新火花",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交角色 E/I",
            "description": "你是社团的“外交部”部长。",
            "choices": [
                {
                    "text": "每天活跃在几十个外部群里，是著名的社交达人",
                    "trait": "E"
                },
                {
                    "text": "只有在需要正式签约或谈合作时，才进行一对一会谈",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "决策逻辑 T/F",
            "description": "某个社团想跟我们合作，但他们风评一般。",
            "choices": [
                {
                    "text": "拒绝合作，认为品牌受损的代价远高于合作收益",
                    "trait": "T"
                },
                {
                    "text": "尝试拉对方一把，觉得可以通过合作引导他们向好",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "工作模式 J/P",
            "description": "策划三校联动的“SDG 嘉年华”。",
            "choices": [
                {
                    "text": "必须先签三方协议，定好责任分摊和赔偿条款",
                    "trait": "J"
                },
                {
                    "text": "大家先口头答应，具体做的时候根据各校情况灵活调配",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "关注重点 T/F",
            "description": "评价合作伙伴好不好。",
            "choices": [
                {
                    "text": "办事利索、不拖拉、承诺的事情都能做到位",
                    "trait": "T"
                },
                {
                    "text": "沟通舒服、性格好、遇到困难能互帮互助",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "学习偏好 S/N",
            "description": "听关于“全球化合作”的报告。",
            "choices": [
                {
                    "text": "喜欢听各国进出口额度、具体的贸易协定条款",
                    "trait": "S"
                },
                {
                    "text": "喜欢听“地球村”理念和跨文化沟通的障碍模型",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "社交习惯 E/I",
            "description": "合作项目大获成功。",
            "choices": [
                {
                    "text": "提议大家举办一场狂欢 Party，不醉不归",
                    "trait": "E"
                },
                {
                    "text": "给合作伙伴发一封真诚的长感谢信，表达谢意",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务执行 J/P",
            "description": "负责管理社团的“外部资源库”。",
            "choices": [
                {
                    "text": "分类清晰（政府、企业、兄弟社团），定期更新",
                    "trait": "J"
                },
                {
                    "text": "随便记在各种记事本上，反正需要用的时候总能翻到",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "冲突反馈 T/F",
            "description": "合作伙伴突然说没经费了。",
            "choices": [
                {
                    "text": "按合同办事，要求对方赔偿或寻找替代资源",
                    "trait": "T"
                },
                {
                    "text": "表示没关系，我们这边想办法多分担点，别让对方难做",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "信息传播 E/I",
            "description": "想要寻找赞助商支持 SDG 活动。",
            "choices": [
                {
                    "text": "带着方案去各家店面扫街，和老板们面对面谈",
                    "trait": "E"
                },
                {
                    "text": "通过社交软件投放广告，等待意向方主动上门",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "视野逻辑 S/N",
            "description": "思考“伙伴关系”。",
            "choices": [
                {
                    "text": "关注具体的一对一协作能否完成任务",
                    "trait": "S"
                },
                {
                    "text": "思考全校甚至全球如何形成一个共生的支持网络",
                    "trait": "N"
                }
            ]
        },
        {
            "title": "变化应对 J/P",
            "description": "合作方临时加了一个活动环节。",
            "choices": [
                {
                    "text": "感到很抓狂，觉得原来的策划案全都废了",
                    "trait": "J"
                },
                {
                    "text": "觉得很有挑战性，立刻兴奋地开始想新环节的创意",
                    "trait": "P"
                }
            ]
        },
        {
            "title": "价值判断 T/F",
            "description": "合作的目的：",
            "choices": [
                {
                    "text": "整合资源，提升效率，达成目标最大化",
                    "trait": "T"
                },
                {
                    "text": "建立情感连接，让世界不再是孤岛",
                    "trait": "F"
                }
            ]
        },
        {
            "title": "沟通方式 E/I",
            "description": "想要解决跨部门推诿的问题。",
            "choices": [
                {
                    "text": "把所有负责人叫到一起开个“吐槽大会”，当面解决",
                    "trait": "E"
                },
                {
                    "text": "分别私下走访，摸清各方苦衷后再出协调方案",
                    "trait": "I"
                }
            ]
        },
        {
            "title": "任务量级 S/N",
            "description": "社团下周目标：",
            "choices": [
                {
                    "text": "跟校外 3 家爱心超市签下废旧电池回收协议",
                    "trait": "S"
                },
                {
                    "text": "构建一个“跨学科 SDG 创新实验室”的雏形",
                    "trait": "N"
                }
            ]
        }
    ]
};

function formatChoiceText(choice) {
    return choice.trait ? `${choice.text} (${choice.trait})` : choice.text;
}

// ===================== 生成关卡 =====================
function generateLevels(club) {
    const tpls = currentLang === 'zh' ? templates_zh : templates_en;
    const baseTemplates = tpls[club.id] || tpls[1];

    return baseTemplates.map((template, idx) => ({
        level: idx + 1,
        title: template.title,
        description: template.description,
        choices: template.choices.map((choice, choiceIdx) => ({
            text: formatChoiceText(choice),
            value: choiceIdx,
            trait: choice.trait || ''
        }))
    }));
}

// 辅助函数：为 prompt 生成英文关卡数据（仅在中文模式下使用）
function generateLevelsForPrompt(clubEn) {
    const baseTemplates = templates_en[clubEn.id] || templates_en[1];

    return baseTemplates.map((template) => ({
        title: template.title,
        description: template.description,
        choices: template.choices.map((choice, idx) => ({
            text: formatChoiceText(choice),
            value: idx,
            trait: choice.trait || ''
        }))
    }));
}

// ===================== 游戏状态 =====================
let gameState = {
    selectedClub: null,
    currentLevel: 0,
    levels: [],
    choices: []
};

// DOM元素
const startScreen = document.getElementById('start-screen');
const clubSelectionScreen = document.getElementById('club-selection-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

// ===================== 初始化 =====================
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    showScreen('start-screen');

    const welcomeChar = document.querySelector('.welcome-character');
    if (welcomeChar) {
        welcomeChar.style.animation = 'bounce 2s ease-in-out infinite, rotate 4s linear infinite';
    }

    // 语言选择按钮
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLang = btn.dataset.lang;
            applyStartScreenLang();
        });
    });

    document.getElementById('start-btn').addEventListener('click', () => {
        const btn = document.getElementById('start-btn');
        btn.style.animation = 'celebrate 0.5s ease-in-out';
        if (welcomeChar) {
            welcomeChar.style.animation = 'successJump 0.8s ease-in-out';
        }
        setTimeout(() => {
            showClubSelection();
        }, 500);
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        resetGame();
        showScreen('start-screen');
        const wc = document.querySelector('.welcome-character');
        if (wc) wc.style.animation = 'bounce 2s ease-in-out infinite, rotate 4s linear infinite';
    });

    applyStartScreenLang();
}

function applyStartScreenLang() {
    document.getElementById('subtitle-text').textContent = t('subtitle');
    document.getElementById('start-btn').textContent = t('startBtn');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showClubSelection() {
    showScreen('club-selection-screen');
    renderClubGrid();

    const headerChar = document.querySelector('.header-character');
    if (headerChar) {
        headerChar.style.animation = 'hop 0.5s ease-in-out';
        setTimeout(() => { headerChar.style.animation = 'hop 2s ease-in-out infinite'; }, 500);
    }
}

function renderClubGrid() {
    // 更新标题
    const header = document.querySelector('.screen-header');
    if (header) {
        header.querySelector('h2').textContent = t('chooseClub');
        header.querySelector('p').textContent = t('chooseClubDesc');
    }

    const grid = document.getElementById('club-grid');
    grid.innerHTML = '';

    const clubIcons = {1:'🎁',2:'🍽️',3:'🧠',4:'📚',5:'⚖️',6:'💧',7:'🔆',8:'💼',9:'💡',10:'🤝',11:'🏙️',12:'♻️',13:'🌍',14:'🐠',15:'🌳',16:'🕊️',17:'🤲'};

    const clubsData = getClubs();
    clubsData.forEach(club => {
        const card = document.createElement('div');
        card.className = 'club-card';
        card.innerHTML = `
            <div class="club-illustration">
                <div class="club-illustration-circle">
                    <span class="club-emoji">${clubIcons[club.id] || '⭐'}</span>
                </div>
            </div>
            <div class="sdg-number">${club.sdg}</div>
            <div class="club-name">${club.name}</div>
            <div class="activity">${club.activity}</div>
            <div class="slogan">${club.slogan}</div>
        `;
        card.addEventListener('click', () => { selectClub(club); });
        grid.appendChild(card);
    });
}

function selectClub(club) {
    gameState.selectedClub = club;
    gameState.levels = generateLevels(club);
    gameState.currentLevel = 0;
    gameState.choices = [];

    document.querySelectorAll('.club-card').forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    event.currentTarget.style.animation = 'celebrate 0.6s ease-in-out';

    const headerChar = document.querySelector('.header-character');
    if (headerChar) headerChar.style.animation = 'successJump 0.8s ease-in-out';

    setTimeout(() => { startGame(); }, 800);
}

function startGame() {
    showScreen('game-screen');
    document.getElementById('current-club-name').textContent = gameState.selectedClub.name;
    document.getElementById('current-club-slogan').textContent = gameState.selectedClub.slogan;
    loadLevel(0);
}

function loadLevel(levelIndex) {
    if (levelIndex >= gameState.levels.length) { finishGame(); return; }

    gameState.currentLevel = levelIndex;
    const level = gameState.levels[levelIndex];

    const progress = ((levelIndex + 1) / gameState.levels.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${t('level')} ${levelIndex + 1}/${gameState.levels.length}`;

    const npcQuestion = { emoji: '🦓', name: t('npcQuestionName'), role: t('npcQuestionRole') };
    const npcAnswer = { emoji: '🐰', name: t('npcAnswerName'), role: t('npcAnswerRole') };

    const container = document.getElementById('level-container');
    container.innerHTML = `
        <div class="npc-dialogue">
            <div class="npc-dialogue-main">
                <div class="npc-column npc-column-question">
                    <div class="npc-avatar-block">
                        <div class="npc-avatar level-character">${npcQuestion.emoji}</div>
                        <div class="npc-meta">
                            <div class="npc-name">${npcQuestion.name}</div>
                            <div class="npc-role">${npcQuestion.role}</div>
                        </div>
                    </div>
                    <div class="npc-bubble npc-bubble-question">
                        <div class="npc-title">${level.title}</div>
                        <div class="npc-text">${level.description}</div>
                    </div>
                </div>
                <div class="npc-column npc-column-answer">
                    <div class="npc-avatar-block npc-avatar-block-answer">
                        <div class="npc-avatar npc-avatar-answer">${npcAnswer.emoji}</div>
                        <div class="npc-meta npc-meta-answer">
                            <div class="npc-name">${npcAnswer.name}</div>
                            <div class="npc-role">${npcAnswer.role}</div>
                        </div>
                    </div>
                    <div class="player-choices">
                        <div class="player-label">${t('chooseReply')}</div>
                        <div class="level-choices">
                            ${level.choices.map((choice, idx) => `
                                <button class="choice-btn" data-choice="${idx}">${choice.text}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectChoice(levelIndex, parseInt(e.target.dataset.choice));
        });
        btn.addEventListener('mouseenter', () => {
            const char = container.querySelector('.level-character');
            if (char) char.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', () => {
            const char = container.querySelector('.level-character');
            if (char) char.style.transform = 'scale(1)';
        });
    });

    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('finish-game-btn').style.display = 'none';
}

function selectChoice(levelIndex, choiceIndex) {
    gameState.choices[levelIndex] = choiceIndex;

    document.querySelectorAll('.choice-btn').forEach((btn, idx) => {
        if (idx === choiceIndex) {
            btn.classList.add('selected');
            btn.style.animation = 'celebrate 0.5s ease-in-out';
            setTimeout(() => { btn.style.animation = ''; }, 500);
        } else {
            btn.classList.remove('selected');
        }
    });

    const levelChar = document.querySelector('.level-character');
    if (levelChar) {
        levelChar.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            levelChar.style.animation = 'pulse 2s ease-in-out infinite, wiggle 3s ease-in-out infinite';
        }, 600);
    }

    setTimeout(() => {
        if (levelIndex === gameState.levels.length - 1) { finishGame(); }
        else { loadLevel(levelIndex + 1); }
    }, 700);
}

function finishGame() {
    showScreen('result-screen');

    // 更新结果页面文字
    document.querySelector('#result-screen .result-content h2').textContent = t('congrats');
    document.getElementById('restart-btn').textContent = t('playAgain');

    const celebChars = document.querySelectorAll('.celeb-char');
    celebChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.animation = 'celebrate 1s ease-in-out infinite, float 3s ease-in-out infinite';
        }, index * 100);
    });

    predictMBTI();
}

// ===================== 职业建议 fallback =====================
const MBTI_CAREER_MAP = {
    ESTP: ['Entrepreneur / Startup Founder','Sales or Business Development Specialist','Project Manager for Fast-paced Teams','Event Planner or Experiential Marketing Lead','Operations Manager in Retail or Hospitality'],
    ESFP: ['Performer or Entertainer','Public Relations or Brand Ambassador','Tourism / Travel Consultant','Event Host or Community Manager','Early Childhood Educator'],
    ENFP: ['Creative Director or Content Strategist','Counselor or Coach','NGO / Social Innovation Project Lead','Marketing or Product Evangelist','Start-up Founder in Impact Fields'],
    ENTP: ['Innovation Consultant','Product Manager in Tech','Strategy or Management Consultant','Startup Founder','Media / Debate / Podcast Host'],
    ESFJ: ['HR or Talent Development Specialist','Teacher or School Administrator','Community / Program Coordinator','Customer Success Manager','Healthcare or Nursing Roles'],
    ISFJ: ['Nurse or Healthcare Support','Administrative or Executive Assistant','Librarian or Archivist','Primary School Teacher','Social Worker'],
    ENFJ: ['Teacher or Lecturer','HR / Organizational Development','Non-profit or Community Leader','Career or Life Coach','Team Lead in People-centric Roles'],
    INFJ: ['Psychologist or Counselor','Writer or Editor','UX Researcher','Non-profit Strategist','Education Program Designer'],
    ISTJ: ['Accountant or Auditor','Data / Records Manager','Quality Assurance Specialist','Logistics or Supply Chain Planner','Civil Servant in Administrative Roles'],
    INTJ: ['Data Scientist or Analyst','Researcher or Academic','Strategy or Product Manager','Systems Architect','Consultant in Tech or Finance'],
    ENTJ: ['Executive or Department Manager','Business Strategy Consultant','Product Owner / Director','Entrepreneur or Venture Builder','Operations Director'],
    INTP: ['Research Scientist','Software or Systems Architect','Data Analyst','R&D Engineer','Professor or Theorist'],
    ISFP: ['Designer (Graphic / UI / Fashion)','Photographer or Videographer','Art Therapist','Landscape or Interior Designer','Craftsperson or Artisan'],
    ISTP: ['Engineer or Technician','Pilot or Driver','Mechanic or Maker','Emergency Response Roles','Security or Forensics Specialist'],
    INFP: ['Writer, Poet, or Novelist','Counselor or Therapist','NGO / Social Impact Worker','Content Creator in Culture or Education','Game / Narrative Designer'],
    ESTJ: ['Operations or Plant Manager','Project Manager','Police / Military Officer','School Principal','Banking / Finance Supervisor']
};

const MBTI_CAREER_MAP_ZH = {
    ESTP: ['创业者 / 初创公司创始人','销售或商务拓展专员','快节奏团队项目经理','活动策划或体验营销负责人','零售或酒店运营经理'],
    ESFP: ['表演者或艺人','公关或品牌大使','旅游顾问','活动主持人或社群运营','幼儿教育工作者'],
    ENFP: ['创意总监或内容策略师','咨询师或教练','公益组织 / 社会创新项目负责人','市场营销或产品推广人','社会影响力领域创业者'],
    ENTP: ['创新咨询顾问','科技行业产品经理','战略或管理咨询师','初创企业创始人','媒体 / 辩论 / 播客主持人'],
    ESFJ: ['人力资源或人才发展专员','教师或学校管理者','社区 / 项目协调员','客户成功经理','医疗护理相关岗位'],
    ISFJ: ['护士或医疗支持人员','行政或执行助理','图书管理员或档案管理员','小学教师','社会工作者'],
    ENFJ: ['教师或讲师','人力资源 / 组织发展专员','非营利组织或社区负责人','职业或人生教练','以人为本团队的负责人'],
    INFJ: ['心理咨询师','作家或编辑','用户体验研究员','公益组织策略师','教育项目设计师'],
    ISTJ: ['会计师或审计师','数据 / 档案管理员','质量保证专员','物流或供应链规划师','行政类公务员'],
    INTJ: ['数据科学家或分析师','研究员或学者','战略或产品经理','系统架构师','科技或金融咨询顾问'],
    ENTJ: ['高管或部门经理','商业战略咨询师','产品负责人 / 总监','创业者或风险投资人','运营总监'],
    INTP: ['研究科学家','软件或系统架构师','数据分析师','研发工程师','教授或理论研究者'],
    ISFP: ['设计师（平面 / UI / 时尚）','摄影师或摄像师','艺术治疗师','景观或室内设计师','手工艺人'],
    ISTP: ['工程师或技术员','飞行员或驾驶员','机械师或创客','应急响应人员','安全或取证专家'],
    INFP: ['作家、诗人或小说家','心理咨询师或治疗师','公益 / 社会影响力工作者','文化或教育内容创作者','游戏 / 叙事设计师'],
    ESTJ: ['运营或工厂经理','项目经理','警察 / 军官','学校校长','银行 / 金融主管']
};

function buildCareerListHtml(mbti) {
    const isZh = currentLang === 'zh';
    const list = isZh ? (MBTI_CAREER_MAP_ZH[mbti] || []) : (MBTI_CAREER_MAP[mbti] || []);
    if (!list.length) return '';
    const items = list.map(item => `<li>${item}</li>`).join('');
    const heading = isZh ? `${mbti} 推荐职业方向` : `Suggested Career Paths for ${mbti}`;
    return `
        <div style="margin-top: 24px;">
            <h4 style="margin-bottom: 10px;">${heading}</h4>
            <ul style="margin-left: 20px; line-height: 1.7;">${items}</ul>
        </div>
    `;
}

// ===================== MBTI 预测 =====================
async function predictMBTI() {
    const resultDiv = document.getElementById('mbti-result');
    resultDiv.innerHTML = `<div class="loading">${t('analyzing')}</div>`;

    try {
        const prompt = buildMBTIPrompt();
        const cloudBaseResult = await requestMbtiFromCloudBase(prompt);
        if (!cloudBaseResult?.ok || !cloudBaseResult?.mbtiText) {
            throw new Error(cloudBaseResult?.error || 'CloudBase function is not ready');
        }

        const mbtiText = cloudBaseResult.mbtiText;
        const mbtiMatch = mbtiText.match(/\b([EI][NS][FT][PJ])\b/);
        const predictedMBTI = cloudBaseResult.predictedMBTI || (mbtiMatch ? mbtiMatch[1] : gameState.selectedClub.mbti);
        const careerHtml = buildCareerListHtml(predictedMBTI);

        resultDiv.innerHTML = `
            <div class="mbti-card">${predictedMBTI}</div>
            <div class="mbti-description">
                <h3>${t('resultTitle')}: ${predictedMBTI}</h3>
                <p>${mbtiText}</p>
                ${careerHtml}
                <p style="margin-top: 20px; font-style: italic; color: #888;">
                    ${t('typicalType')} "${gameState.selectedClub.name}" ${t('youChoseIs')}: ${gameState.selectedClub.mbti}
                </p>
            </div>
        `;
    } catch (error) {
        console.error('MBTI Prediction Error:', error);
        console.error('Error details:', error.message);
        const fallbackMBTI = gameState.selectedClub.mbti;
        const careerHtml = buildCareerListHtml(fallbackMBTI);
        resultDiv.innerHTML = `
            <div class="mbti-card">${fallbackMBTI}</div>
            <div class="mbti-description">
                <h3>${t('resultTitle')}: ${fallbackMBTI}</h3>
                <p>${t('basedOnChoices')} "${gameState.selectedClub.name}" ${t('clubActivities')} <strong>${fallbackMBTI}</strong>。</p>

                <h4 style="margin-top: 18px; margin-bottom: 8px;">${t('skillsTitle')}</h4>
                <p>${fallbackMBTI} ${t('skillsFallback')}</p>

                <h4 style="margin-top: 18px; margin-bottom: 8px;">${t('interestsTitle')}</h4>
                <p>"${gameState.selectedClub.activity}" ${t('interestsFallback')} ${fallbackMBTI} ${t('interestsFallback2')}</p>

                ${careerHtml}
                <p style="margin-top: 20px;">${t('typicalMatch')} ${fallbackMBTI}。</p>
            </div>
        `;
    }
}

function buildMBTIPrompt() {
    const club = gameState.selectedClub;
    // 始终找到对应的英文社团数据，确保 API 理解准确
    const clubEn = clubs_en.find(c => c.id === club.id) || club;
    const langInstruction = currentLang === 'zh'
        ? '请用中文回答。所有内容（包括MBTI分析、技能、兴趣和职业建议）都必须使用中文。'
        : 'Please answer in English.';

    let prompt = `You are an MBTI personality type analysis expert. Please analyze a person's MBTI type based on the following information:

Selected Club: ${clubEn.name} / ${club.name} (${clubEn.sdg})
Club Activity: ${clubEn.activity} / ${club.activity}
Club Slogan: ${clubEn.slogan} / ${club.slogan}
Club Typical MBTI Type: ${club.mbti}

The person's choices in ${gameState.levels.length} levels:
`;

    // 如果是中文，同时生成英文关卡数据供 API 参考
    const levelsEn = (currentLang === 'zh')
        ? generateLevelsForPrompt(clubEn)
        : null;

    gameState.levels.forEach((level, idx) => {
        const choiceIndex = gameState.choices[idx] || 0;
        const choice = level.choices[choiceIndex];
        prompt += `\nLevel ${idx + 1}: ${level.title}\n`;
        prompt += `Question: ${level.description}\n`;
        prompt += `Choice: ${choice.text}\n`;
        // 附带英文版本帮助 API 理解
        if (levelsEn && levelsEn[idx]) {
            const enLevel = levelsEn[idx];
            const enChoice = enLevel.choices[choiceIndex];
            prompt += `(English ref: ${enLevel.title} / ${enLevel.description} / ${enChoice.text})\n`;
        }
    });

    prompt += `\nThen respond briefly in THREE clearly separated sections only:
1. MBTI: State the four-letter MBTI type and one short summary sentence.
2. Skills: Give 3-5 short bullet points about likely strengths and core skills.
3. Interests: Give 3-5 short bullet points about likely interests, motivations and preferred environments.

Keep the answer concise and useful. Do not add a Career Advice section because the frontend will show career suggestions separately.
Use clear headings exactly: "MBTI", "Skills", and "Interests".

${langInstruction}`;

    return prompt;
}

function resetGame() {
    gameState = { selectedClub: null, currentLevel: 0, levels: [], choices: [] };
}
