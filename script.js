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
    1: [
        { title: 'Preparing the Donation Drive', description: 'You are organizing a campus idle goods donation drive. How would you start?', choices: ['Create a detailed plan and timeline, ensuring each step has a responsible person', 'Start promoting immediately to get students involved', 'First understand students\' needs and what they require', 'Start collecting items directly and adjust as you go'] },
        { title: 'Handling Donated Items', description: 'Some of the collected items are damaged. How would you handle them?', choices: ['Carefully categorize and repair items that can be fixed', 'Discard damaged items directly, keeping only the good ones', 'Ask professionals how to handle them', 'Organize volunteers to repair them together'] },
        { title: 'Promoting the Activity', description: 'How would you let more people know about this activity?', choices: ['Create beautiful posters and flyers to post around campus', 'Promote through social media and friend circles', 'Contact student council and clubs for collaborative promotion', 'Hold a small launch event to attract attention'] },
        { title: 'Distributing Donated Items', description: 'How would you fairly distribute the collected items?', choices: ['Prioritize those most in need based on survey results', 'Distribute randomly to ensure everyone has a chance', 'Set up an application process for those in need', 'Organize a lottery for fair distribution'] },
        { title: 'Activity Summary', description: 'After the activity ends, how would you summarize it?', choices: ['Record detailed activity data and analyze successes and shortcomings', 'Hold a thank-you event to appreciate all participants', 'Share activity photos and stories to spread positive energy', 'Plan the next activity for continuous improvement'] }
    ],
    2: [
        { title: 'Launching the Clean Plate Challenge', description: 'How would you start the "Clean Plate Challenge"?', choices: ['First investigate campus waste situation and collect data', 'Start promoting immediately to get everyone involved', 'Design interesting challenge rules and reward mechanisms', 'Contact the cafeteria for collaborative promotion'] },
        { title: 'Designing Challenge Rules', description: 'How would you make the challenge more fun and effective?', choices: ['Set up a check-in mechanism to record daily clean plate status', 'Organize team competitions to add fun', 'Provide small rewards to motivate participants', 'Share knowledge and stories about saving food'] },
        { title: 'Handling Food Waste', description: 'If you see classmates wasting food, what would you do?', choices: ['Kindly remind them and share the importance of saving', 'Organize discussions to help everyone understand food\'s value', 'Design interesting interactions to raise awareness about waste', 'Explain the issue through data and facts'] },
        { title: 'Expanding Impact', description: 'How would you get more people involved?', choices: ['Create promotional videos to spread on social media', 'Invite celebrities or teachers to participate', 'Collaborate with other clubs to expand influence', 'Host themed events to attract attention'] },
        { title: 'Continuous Improvement', description: 'How would you keep the activity effective?', choices: ['Regularly evaluate effectiveness and adjust strategies', 'Establish long-term mechanisms for continuous promotion', 'Collect feedback and continuously improve', 'Cultivate habits to make saving natural'] }
    ],
    3: [
        { title: 'Planning Mental Health Workshop', description: 'How would you plan a mental health workshop?', choices: ['First understand students\' mental health needs', 'Invite professional counselors to participate', 'Design highly interactive activity sessions', 'Prepare practical mental health resources'] },
        { title: 'Choosing a Theme', description: 'What theme should the workshop focus on?', choices: ['Stress management and coping strategies', 'Emotional regulation and mental health', 'Interpersonal relationships and communication skills', 'Self-awareness and growth'] },
        { title: 'Activity Format', description: 'How would you make the workshop more effective?', choices: ['Combine lectures with interactive activities', 'Use group discussions and sharing', 'Add games and experiential sessions', 'Provide one-on-one counseling opportunities'] },
        { title: 'Creating a Safe Atmosphere', description: 'How would you make participants feel safe and comfortable?', choices: ['Establish confidentiality and respect rules', 'Create a relaxed and friendly atmosphere', 'Encourage sharing without forcing', 'Provide support and understanding'] },
        { title: 'Ongoing Support', description: 'How would you provide continuous support after the workshop?', choices: ['Build a mental health resource library', 'Regularly host follow-up activities', 'Provide counseling channels and contact information', 'Establish a peer support network'] }
    ],
    4: [
        { title: 'Launching Community Tutoring Program', description: 'How would you start a community academic tutoring program?', choices: ['First understand the learning needs of community students', 'Recruit capable volunteers', 'Design curriculum and teaching plans', 'Find suitable teaching venues'] },
        { title: 'Matching Students and Tutors', description: 'How would you match students with suitable tutors?', choices: ['Match based on subject and grade level', 'Consider learning styles and personalities', 'Let students and tutors choose each other', 'Match based on time and location'] },
        { title: 'Designing Teaching Methods', description: 'How would you make tutoring more effective?', choices: ['Personalized teaching tailored to individual needs', 'Use interactive and gamified methods', 'Encourage students to ask questions actively', 'Regularly assess learning progress'] },
        { title: 'Inspiring Learning Interest', description: 'How would you make students interested in learning?', choices: ['Connect knowledge with real life', 'Use interesting teaching materials', 'Set small goals and rewards', 'Share success stories and role models'] },
        { title: 'Evaluation and Improvement', description: 'How would you continuously improve the program?', choices: ['Regularly collect feedback from students and tutors', 'Evaluate learning outcomes and progress', 'Adjust teaching methods and content', 'Expand the program\'s impact'] }
    ],
    5: [
        { title: 'Organizing Gender Equality Discussion', description: 'How would you organize a gender equality discussion?', choices: ['Invite speakers from diverse backgrounds', 'Design interactive discussion sessions', 'Prepare relevant data and cases', 'Create an open and inclusive discussion atmosphere'] },
        { title: 'Choosing Discussion Topic', description: 'What topic should be discussed?', choices: ['Gender equality in the workplace', 'Gender bias in education', 'Social stereotypes', 'How to promote gender equality'] },
        { title: 'Handling Different Perspectives', description: 'If different perspectives arise, what would you do?', choices: ['Encourage rational discussion and debate', 'Guide everyone to understand different perspectives', 'Provide facts and data support', 'Emphasize respect and understanding'] },
        { title: 'Taking Action', description: 'How would you take action after the discussion?', choices: ['Develop an action plan', 'Organize related activities', 'Build a support network', 'Continue to pay attention and advocate'] },
        { title: 'Expanding Impact', description: 'How would you get more people to care about gender equality?', choices: ['Spread through social media', 'Collaborate with other organizations', 'Host more activities', 'Cultivate advocates'] }
    ],
    6: [
        { title: 'Launching Water Conservation Activity', description: 'How would you start a water conservation activity?', choices: ['First investigate campus water usage', 'Design water conservation challenges', 'Promote water conservation knowledge', 'Install water-saving devices'] },
        { title: 'Water Quality Testing', description: 'How would you organize a water quality testing activity?', choices: ['Learn water quality testing methods', 'Invite professionals to guide', 'Organize students to participate in testing', 'Record and share test results'] },
        { title: 'Raising Awareness', description: 'How would you raise everyone\'s water conservation awareness?', choices: ['Share data on water scarcity', 'Demonstrate actual water-saving effects', 'Organize experiential activities', 'Set water conservation goals'] },
        { title: 'Innovative Methods', description: 'How would you innovate water conservation methods?', choices: ['Collect rainwater for irrigation', 'Modify water-using equipment', 'Recycle water resources', 'Design water-saving systems'] },
        { title: 'Sustained Action', description: 'How would you make water conservation a habit?', choices: ['Establish long-term mechanisms', 'Regular reminders and promotion', 'Set up reward mechanisms', 'Cultivate water conservation culture'] }
    ],
    7: [
        { title: 'Planning Solar DIY Workshop', description: 'How would you plan a solar device DIY workshop?', choices: ['Design simple and easy projects', 'Prepare materials and tools', 'Invite experts to guide', 'Ensure safety measures'] },
        { title: 'Choosing Projects', description: 'What projects should be done?', choices: ['Solar charger', 'Solar light', 'Solar fan', 'Solar phone stand'] },
        { title: 'Teaching Methods', description: 'How would you help participants learn?', choices: ['Explain step by step in detail', 'Provide illustrated tutorials', 'Live demonstration and guidance', 'Encourage hands-on practice'] },
        { title: 'Application and Promotion', description: 'How would you promote clean energy?', choices: ['Showcase project results', 'Share usage experiences', 'Organize more activities', 'Build a learning community'] },
        { title: 'Continuous Innovation', description: 'How would you continuously innovate?', choices: ['Explore new projects', 'Improve existing designs', 'Share experiences and knowledge', 'Cultivate innovative thinking'] }
    ],
    8: [
        { title: 'Organizing Green Career Sharing Session', description: 'How would you organize a green career sharing session?', choices: ['Invite professionals from different fields', 'Design interactive sessions', 'Prepare career information', 'Create a communication platform'] },
        { title: 'Choosing Speakers', description: 'Who should be invited as speakers?', choices: ['Environmental industry practitioners', 'Sustainable development experts', 'Entrepreneurs and business owners', 'Representatives from different professions'] },
        { title: 'Content Design', description: 'What content should the sharing session include?', choices: ['Career development paths', 'Skill requirements', 'Industry prospects', 'Real work experiences'] },
        { title: 'Interactive Sessions', description: 'How would you increase interaction?', choices: ['Q&A sessions', 'Group discussions', 'Career counseling', 'Networking'] },
        { title: 'Ongoing Support', description: 'How would you provide continuous support?', choices: ['Build a career resource library', 'Provide internship opportunities', 'Organize follow-up activities', 'Establish a mentor network'] }
    ],
    9: [
        { title: 'Launching Upcycling Contest', description: 'How would you launch an upcycled tech creation contest?', choices: ['Design contest rules and themes', 'Prepare materials and tools', 'Invite judges', 'Promote the contest'] },
        { title: 'Choosing Theme', description: 'What should the contest focus on?', choices: ['Electronic device upcycling', 'Creative tech applications', 'Environmental technology', 'Practical innovation'] },
        { title: 'Judging Criteria', description: 'How would you judge the works?', choices: ['Innovation and creativity', 'Practicality and functionality', 'Environmental and sustainability', 'Technical difficulty'] },
        { title: 'Supporting Participants', description: 'How would you support participants?', choices: ['Provide technical guidance', 'Organize training workshops', 'Provide materials and tools', 'Build a communication platform'] },
        { title: 'Showcasing Results', description: 'How would you showcase contest results?', choices: ['Hold an exhibition', 'Create a portfolio', 'Share success stories', 'Promote outstanding works'] }
    ],
    10: [
        { title: 'Organizing Barrier-Free Experience Activity', description: 'How would you organize a barrier-free experience and fellowship activity?', choices: ['Design experience sessions', 'Invite people from diverse backgrounds', 'Create an inclusive environment', 'Promote understanding and communication'] },
        { title: 'Experience Design', description: 'What experiences should be designed?', choices: ['Barrier-free facility experiences', 'Different ability experiences', 'Cultural exchange', 'Common activities'] },
        { title: 'Breaking Barriers', description: 'How would you break barriers?', choices: ['Provide barrier-free facilities', 'Create an inclusive environment', 'Promote understanding and respect', 'Build a support network'] },
        { title: 'Building Connections', description: 'How would you build connections?', choices: ['Organize fellowship activities', 'Promote communication and dialogue', 'Build friendships', 'Maintain continuous interaction'] },
        { title: 'Sustained Impact', description: 'How would you create sustained impact?', choices: ['Establish long-term projects', 'Cultivate advocates', 'Promote policy changes', 'Expand impact scope'] }
    ],
    11: [
        { title: 'Launching Corridor Beautification Project', description: 'How would you launch a corridor green beautification volunteer activity?', choices: ['Design beautification plan', 'Prepare plants and materials', 'Recruit volunteers', 'Obtain permission'] },
        { title: 'Designing the Plan', description: 'How would you design the beautification plan?', choices: ['Choose suitable plants', 'Design layout', 'Consider maintenance', 'Create a beautiful environment'] },
        { title: 'Organizing Activities', description: 'How would you organize the beautification activity?', choices: ['Divide work and collaborate', 'Provide guidance', 'Ensure safety', 'Create fun'] },
        { title: 'Maintenance Management', description: 'How would you maintain the beautification results?', choices: ['Establish maintenance plan', 'Assign responsibilities', 'Regular inspections', 'Continuous improvement'] },
        { title: 'Expanding Impact', description: 'How would you expand the impact?', choices: ['Promote to other areas', 'Share experiences', 'Organize more activities', 'Build beautification culture'] }
    ],
    12: [
        { title: 'Organizing Campus Flea Market', description: 'How would you organize a campus sustainable flea market?', choices: ['Choose venue and time', 'Recruit sellers', 'Design rules', 'Promote the market'] },
        { title: 'Market Rules', description: 'What rules should be set?', choices: ['Encourage second-hand items', 'Ban disposable products', 'Promote sustainable concepts', 'Ensure fair trading'] },
        { title: 'Attracting Participation', description: 'How would you attract more people to participate?', choices: ['Promote environmental concepts', 'Provide fun activities', 'Set up rewards', 'Create social atmosphere'] },
        { title: 'Educational Value', description: 'How would you increase educational value?', choices: ['Share sustainable knowledge', 'Demonstrate recycling', 'Discuss consumption concepts', 'Spread environmental concepts'] },
        { title: 'Sustained Impact', description: 'How would you create sustained impact?', choices: ['Hold regularly', 'Build a platform', 'Cultivate habits', 'Expand influence'] }
    ],
    13: [
        { title: 'Launching Carbon Footprint Calculation Activity', description: 'How would you launch a carbon footprint calculation and discussion activity?', choices: ['Learn calculation methods', 'Design calculation tools', 'Organize discussion sessions', 'Prepare relevant materials'] },
        { title: 'Calculation Methods', description: 'How would you calculate carbon footprint?', choices: ['Use online tools', 'Design simple questionnaires', 'Record daily activities', 'Analyze data'] },
        { title: 'Discussion Content', description: 'What should be discussed?', choices: ['Personal carbon footprint', 'Reduction methods', 'Climate change impacts', 'Action plans'] },
        { title: 'Taking Action', description: 'How would you take action?', choices: ['Develop reduction plans', 'Change lifestyle habits', 'Promote to others', 'Track continuously'] },
        { title: 'Expanding Impact', description: 'How would you expand the impact?', choices: ['Share experiences', 'Organize more activities', 'Build a community', 'Promote change'] }
    ],
    14: [
        { title: 'Organizing Marine Protection Exhibition', description: 'How would you organize a marine life protection exhibition?', choices: ['Collect relevant materials', 'Design exhibition content', 'Prepare display materials', 'Invite experts'] },
        { title: 'Exhibition Content', description: 'What should be displayed?', choices: ['Marine biodiversity', 'Marine pollution issues', 'Protection measures', 'Success stories'] },
        { title: 'Interactive Design', description: 'How would you increase interaction?', choices: ['Set up interactive exhibits', 'Organize experiential activities', 'Provide educational materials', 'Encourage participation'] },
        { title: 'Call to Action', description: 'How would you call for action?', choices: ['Provide action suggestions', 'Organize volunteer activities', 'Build protection network', 'Continue to pay attention'] },
        { title: 'Sustained Impact', description: 'How would you create sustained impact?', choices: ['Hold activities regularly', 'Establish protection projects', 'Cultivate awareness', 'Expand influence'] }
    ],
    15: [
        { title: 'Organizing Mountain Cleanup Activity', description: 'How would you organize a mountain cleanup and plant protection activity?', choices: ['Choose location', 'Prepare tools', 'Recruit volunteers', 'Ensure safety'] },
        { title: 'Activity Content', description: 'What should the activity include?', choices: ['Clean up trash', 'Protect plants', 'Learn ecological knowledge', 'Record observations'] },
        { title: 'Safety Education', description: 'How would you ensure safety?', choices: ['Provide safety training', 'Prepare first aid supplies', 'Set safety rules', 'Equip with professionals'] },
        { title: 'Ecological Education', description: 'How would you increase educational value?', choices: ['Learn plant knowledge', 'Understand ecosystems', 'Discuss protection importance', 'Cultivate environmental awareness'] },
        { title: 'Sustained Protection', description: 'How would you sustain protection?', choices: ['Regular activities', 'Establish protection projects', 'Cultivate habits', 'Expand influence'] }
    ],
    16: [
        { title: 'Organizing Legal Knowledge Quiz', description: 'How would you organize a legal knowledge quiz?', choices: ['Design questions', 'Set rules', 'Invite judges', 'Promote the quiz'] },
        { title: 'Question Design', description: 'What questions should be included?', choices: ['Basic legal knowledge', 'Real cases', 'Rights and obligations', 'Legal procedures'] },
        { title: 'Quiz Format', description: 'What format should be adopted?', choices: ['Individual competition', 'Team competition', 'Quick answer', 'Case analysis'] },
        { title: 'Educational Value', description: 'How would you increase educational value?', choices: ['Explain correct answers', 'Discuss cases', 'Share legal knowledge', 'Cultivate legal awareness'] },
        { title: 'Continuous Learning', description: 'How would you continue learning?', choices: ['Build learning resources', 'Hold activities regularly', 'Cultivate interest', 'Expand influence'] }
    ],
    17: [
        { title: 'Launching Inter-Club SDG Project Matching', description: 'How would you launch inter-club SDG project matching?', choices: ['Understand each club\'s projects', 'Design matching mechanism', 'Build collaboration platform', 'Promote communication'] },
        { title: 'Matching Methods', description: 'How would you match projects?', choices: ['Match based on goals', 'Match based on resources', 'Match based on interests', 'Match based on needs'] },
        { title: 'Promoting Collaboration', description: 'How would you promote collaboration?', choices: ['Organize meetups', 'Provide collaboration guidance', 'Build communication channels', 'Create collaboration opportunities'] },
        { title: 'Supporting Projects', description: 'How would you support collaborative projects?', choices: ['Provide resources', 'Coordinate communication', 'Track progress', 'Solve problems'] },
        { title: 'Expanding Impact', description: 'How would you expand the impact?', choices: ['Share success stories', 'Build collaboration network', 'Continue matching', 'Promote more collaboration'] }
    ]
};

// ===================== 关卡模板（中文） =====================
const templates_zh = {
    1: [
        { title: '筹备募捐行动', description: '你正在组织校园闲置物资定向募捐行动，你会怎么开始？', choices: ['制定详细的计划和时间表，确保每个步骤都有负责人', '立即开始宣传，让同学们参与进来', '先了解同学们的需求，看看他们需要什么', '直接开始收集物品，边做边调整'] },
        { title: '处理捐赠物品', description: '收集到的一些物品有损坏，你会怎么处理？', choices: ['仔细分类，修复可以修复的物品', '直接丢弃损坏的，只保留完好的', '咨询专业人士如何处理', '组织志愿者一起修复'] },
        { title: '宣传活动', description: '你会怎么让更多人知道这个活动？', choices: ['制作精美的海报和传单，张贴在校园各处', '通过社交媒体和朋友圈推广', '联系学生会和其他社团协作推广', '举办一个小型启动仪式吸引关注'] },
        { title: '分配捐赠物品', description: '你会怎么公平地分配收集到的物品？', choices: ['根据调查结果，优先分配给最需要的人', '随机分配，确保每个人都有机会', '设置申请流程，让有需要的人申请', '组织抽奖公平分配'] },
        { title: '活动总结', description: '活动结束后，你会怎么做总结？', choices: ['记录详细的活动数据，分析成功和不足', '举办感谢活动，感谢所有参与者', '分享活动照片和故事，传播正能量', '规划下一次活动，持续改进'] }
    ],
    2: [
        { title: '发起光盘挑战', description: '你会怎么发起"光盘挑战"？', choices: ['先调查校园浪费情况，收集数据', '立即开始宣传，让大家参与进来', '设计有趣的挑战规则和奖励机制', '联系食堂进行合作推广'] },
        { title: '设计挑战规则', description: '你会怎么让挑战更有趣更有效？', choices: ['设置打卡机制，记录每天的光盘情况', '组织团队比赛，增加趣味性', '提供小奖品激励参与者', '分享节约粮食的知识和故事'] },
        { title: '处理食物浪费', description: '如果看到同学浪费食物，你会怎么做？', choices: ['友善提醒并分享节约的重要性', '组织讨论帮助大家了解食物的价值', '设计有趣的互动提高大家对浪费的认识', '通过数据和事实说明问题'] },
        { title: '扩大影响', description: '你会怎么让更多人参与进来？', choices: ['制作宣传视频在社交媒体传播', '邀请名人或老师参与', '与其他社团合作扩大影响力', '举办主题活动吸引关注'] },
        { title: '持续改进', description: '你会怎么保持活动的效果？', choices: ['定期评估效果并调整策略', '建立长效机制持续推广', '收集反馈持续改进', '培养习惯让节约成为自然'] }
    ],
    3: [
        { title: '策划心理健康工作坊', description: '你会怎么策划一场心理健康团体辅导活动？', choices: ['先了解同学们的心理健康需求', '邀请专业心理咨询师参与', '设计高度互动的活动环节', '准备实用的心理健康资源'] },
        { title: '选择主题', description: '工作坊应该聚焦什么主题？', choices: ['压力管理与应对策略', '情绪调节与心理健康', '人际关系与沟通技巧', '自我认知与成长'] },
        { title: '活动形式', description: '你会怎么让工作坊更有效？', choices: ['将讲座与互动活动相结合', '运用小组讨论和分享', '加入游戏和体验环节', '提供一对一咨询机会'] },
        { title: '营造安全氛围', description: '你会怎么让参与者感到安全和舒适？', choices: ['建立保密和尊重规则', '营造轻松友好的氛围', '鼓励分享但不强迫', '提供支持和理解'] },
        { title: '持续支持', description: '工作坊结束后，你会怎么提供持续支持？', choices: ['建立心理健康资源库', '定期举办后续活动', '提供心理咨询渠道和联系方式', '建立同伴支持网络'] }
    ],
    4: [
        { title: '启动社区辅导计划', description: '你会怎么启动社区青少年公益课业辅导活动？', choices: ['先了解社区学生的学习需求', '招募有能力的志愿者', '设计课程和教学计划', '寻找合适的教学场地'] },
        { title: '匹配学生与导师', description: '你会怎么为学生匹配合适的导师？', choices: ['根据学科和年级匹配', '考虑学习风格和性格', '让学生和导师互相选择', '根据时间和地点匹配'] },
        { title: '设计教学方法', description: '你会怎么让辅导更有效？', choices: ['因材施教，个性化教学', '运用互动和游戏化方法', '鼓励学生主动提问', '定期评估学习进度'] },
        { title: '激发学习兴趣', description: '你会怎么让学生对学习产生兴趣？', choices: ['将知识与现实生活联系', '使用有趣的教学材料', '设定小目标和奖励', '分享成功故事和榜样'] },
        { title: '评估与改进', description: '你会怎么持续改进这个计划？', choices: ['定期收集学生和导师的反馈', '评估学习成果和进展', '调整教学方法和内容', '扩大项目的影响范围'] }
    ],
    5: [
        { title: '组织性别平等讨论', description: '你会怎么组织一场性别平等主题宣讲活动？', choices: ['邀请不同背景的演讲者', '设计互动讨论环节', '准备相关数据和案例', '营造开放包容的讨论氛围'] },
        { title: '选择讨论话题', description: '应该讨论什么话题？', choices: ['职场中的性别平等', '教育中的性别偏见', '社会刻板印象', '如何促进性别平等'] },
        { title: '处理不同观点', description: '如果出现不同观点，你会怎么做？', choices: ['鼓励理性讨论和辩论', '引导大家理解不同视角', '提供事实和数据支持', '强调尊重和理解'] },
        { title: '付诸行动', description: '讨论之后，你会怎么付诸行动？', choices: ['制定行动计划', '组织相关活动', '建立支持网络', '持续关注和倡导'] },
        { title: '扩大影响', description: '你会怎么让更多人关注性别平等？', choices: ['通过社交媒体传播', '与其他组织合作', '举办更多活动', '培养倡导者'] }
    ],
    6: [
        { title: '发起节水活动', description: '你会怎么发起一场节水科普与水质检测活动？', choices: ['先调查校园用水情况', '设计节水挑战活动', '宣传节水知识', '安装节水设备'] },
        { title: '水质检测', description: '你会怎么组织水质检测活动？', choices: ['学习水质检测方法', '邀请专业人士指导', '组织同学参与检测', '记录并分享检测结果'] },
        { title: '提高意识', description: '你会怎么提高大家的节水意识？', choices: ['分享水资源匮乏的数据', '展示实际节水效果', '组织体验式活动', '设定节水目标'] },
        { title: '创新方法', description: '你会怎么创新节水方法？', choices: ['收集雨水用于浇灌', '改造用水设备', '回收利用水资源', '设计节水系统'] },
        { title: '持续行动', description: '你会怎么让节水成为习惯？', choices: ['建立长效机制', '定期提醒和宣传', '设置奖励机制', '培养节水文化'] }
    ],
    7: [
        { title: '策划太阳能DIY工坊', description: '你会怎么策划一场太阳能简易装置手工制作工坊？', choices: ['设计简单易学的项目', '准备材料和工具', '邀请专家指导', '确保安全措施'] },
        { title: '选择项目', description: '应该做什么项目？', choices: ['太阳能充电器', '太阳能灯', '太阳能风扇', '太阳能手机支架'] },
        { title: '教学方法', description: '你会怎么帮助参与者学习？', choices: ['详细逐步讲解', '提供图文教程', '现场演示和指导', '鼓励动手实践'] },
        { title: '应用与推广', description: '你会怎么推广清洁能源？', choices: ['展示项目成果', '分享使用经验', '组织更多活动', '建立学习社区'] },
        { title: '持续创新', description: '你会怎么持续创新？', choices: ['探索新项目', '改进现有设计', '分享经验和知识', '培养创新思维'] }
    ],
    8: [
        { title: '组织绿色职业分享会', description: '你会怎么组织一场绿色职业发展规划分享沙龙？', choices: ['邀请不同领域的专业人士', '设计互动环节', '准备职业信息资料', '搭建交流平台'] },
        { title: '选择嘉宾', description: '应该邀请谁来分享？', choices: ['环保行业从业者', '可持续发展专家', '创业者和企业家', '不同职业的代表'] },
        { title: '内容设计', description: '分享会应该包括什么内容？', choices: ['职业发展路径', '技能要求', '行业前景', '真实工作经历'] },
        { title: '互动环节', description: '你会怎么增加互动？', choices: ['问答环节', '小组讨论', '职业咨询', '社交联谊'] },
        { title: '持续支持', description: '你会怎么提供持续支持？', choices: ['建立职业资源库', '提供实习机会', '组织后续活动', '建立导师网络'] }
    ],
    9: [
        { title: '发起废旧改造大赛', description: '你会怎么发起一场废旧零件创意科创制作赛？', choices: ['设计比赛规则和主题', '准备材料和工具', '邀请评委', '宣传比赛'] },
        { title: '选择主题', description: '比赛应该聚焦什么？', choices: ['电子设备改造', '创意科技应用', '环保科技', '实用创新'] },
        { title: '评审标准', description: '你会怎么评判作品？', choices: ['创新性和创意', '实用性和功能性', '环保和可持续性', '技术难度'] },
        { title: '支持参赛者', description: '你会怎么支持参赛者？', choices: ['提供技术指导', '组织培训工作坊', '提供材料和工具', '搭建交流平台'] },
        { title: '展示成果', description: '你会怎么展示比赛成果？', choices: ['举办展览', '制作作品集', '分享成功故事', '推广优秀作品'] }
    ],
    10: [
        { title: '组织无障碍体验活动', description: '你会怎么组织一场校园无障碍环境体验与残障伙伴联谊活动？', choices: ['设计体验环节', '邀请不同背景的人参加', '营造包容的环境', '促进理解和沟通'] },
        { title: '体验设计', description: '应该设计什么体验？', choices: ['无障碍设施体验', '不同能力体验', '文化交流', '共同参与的活动'] },
        { title: '打破隔阂', description: '你会怎么打破隔阂？', choices: ['提供无障碍设施', '营造包容环境', '促进理解和尊重', '建立支持网络'] },
        { title: '建立联系', description: '你会怎么建立联系？', choices: ['组织联谊活动', '促进沟通与对话', '建立友谊', '保持持续互动'] },
        { title: '持续影响', description: '你会怎么创造持续影响？', choices: ['建立长期项目', '培养倡导者', '推动政策改变', '扩大影响范围'] }
    ],
    11: [
        { title: '启动楼道美化项目', description: '你会怎么启动一场社区楼道绿色美化志愿行动？', choices: ['设计美化方案', '准备植物和材料', '招募志愿者', '获取许可'] },
        { title: '设计方案', description: '你会怎么设计美化方案？', choices: ['选择合适的植物', '设计布局', '考虑维护问题', '营造美丽环境'] },
        { title: '组织活动', description: '你会怎么组织美化活动？', choices: ['分工协作', '提供指导', '确保安全', '营造乐趣'] },
        { title: '维护管理', description: '你会怎么维护美化成果？', choices: ['制定维护计划', '分配责任', '定期检查', '持续改进'] },
        { title: '扩大影响', description: '你会怎么扩大影响？', choices: ['推广到其他区域', '分享经验', '组织更多活动', '建立美化文化'] }
    ],
    12: [
        { title: '组织校园跳蚤市场', description: '你会怎么组织一场校园可持续跳蚤市场活动？', choices: ['选择场地和时间', '招募卖家', '设计规则', '宣传市场'] },
        { title: '市场规则', description: '应该设定什么规则？', choices: ['鼓励二手物品', '禁止一次性产品', '推广可持续理念', '确保公平交易'] },
        { title: '吸引参与', description: '你会怎么吸引更多人参与？', choices: ['宣传环保理念', '提供趣味活动', '设置奖励', '营造社交氛围'] },
        { title: '教育价值', description: '你会怎么增加教育价值？', choices: ['分享可持续知识', '展示回收利用', '讨论消费理念', '传播环保观念'] },
        { title: '持续影响', description: '你会怎么创造持续影响？', choices: ['定期举办', '搭建平台', '培养习惯', '扩大影响'] }
    ],
    13: [
        { title: '发起碳足迹计算活动', description: '你会怎么发起一场校园碳足迹测算与气候科普活动？', choices: ['学习计算方法', '设计计算工具', '组织讨论环节', '准备相关资料'] },
        { title: '计算方法', description: '你会怎么计算碳足迹？', choices: ['使用在线工具', '设计简易问卷', '记录日常活动', '分析数据'] },
        { title: '讨论内容', description: '应该讨论什么？', choices: ['个人碳足迹', '减排方法', '气候变化影响', '行动计划'] },
        { title: '付诸行动', description: '你会怎么付诸行动？', choices: ['制定减排计划', '改变生活习惯', '向他人推广', '持续追踪'] },
        { title: '扩大影响', description: '你会怎么扩大影响？', choices: ['分享经验', '组织更多活动', '建立社区', '推动变化'] }
    ],
    14: [
        { title: '组织海洋保护展览', description: '你会怎么组织一场海洋生物保护主题科普展览活动？', choices: ['收集相关资料', '设计展览内容', '准备展示材料', '邀请专家'] },
        { title: '展览内容', description: '应该展示什么？', choices: ['海洋生物多样性', '海洋污染问题', '保护措施', '成功案例'] },
        { title: '互动设计', description: '你会怎么增加互动？', choices: ['设置互动展品', '组织体验活动', '提供教育材料', '鼓励参与'] },
        { title: '号召行动', description: '你会怎么号召行动？', choices: ['提供行动建议', '组织志愿活动', '建立保护网络', '持续关注'] },
        { title: '持续影响', description: '你会怎么创造持续影响？', choices: ['定期举办活动', '建立保护项目', '培养环保意识', '扩大影响'] }
    ],
    15: [
        { title: '组织山林清洁活动', description: '你会怎么组织一场近郊山林垃圾清理与植物保护志愿行？', choices: ['选择地点', '准备工具', '招募志愿者', '确保安全'] },
        { title: '活动内容', description: '活动应该包括什么？', choices: ['清理垃圾', '保护植物', '学习生态知识', '记录观察'] },
        { title: '安全教育', description: '你会怎么确保安全？', choices: ['提供安全培训', '准备急救物资', '设定安全规则', '配备专业人员'] },
        { title: '生态教育', description: '你会怎么增加教育价值？', choices: ['学习植物知识', '了解生态系统', '讨论保护重要性', '培养环保意识'] },
        { title: '持续保护', description: '你会怎么持续保护？', choices: ['定期活动', '建立保护项目', '培养习惯', '扩大影响'] }
    ],
    16: [
        { title: '组织法律知识竞赛', description: '你会怎么组织一场校园普法知识趣味竞赛？', choices: ['设计题目', '制定规则', '邀请评委', '宣传竞赛'] },
        { title: '题目设计', description: '应该包括什么题目？', choices: ['基础法律知识', '真实案例', '权利和义务', '法律程序'] },
        { title: '竞赛形式', description: '应该采用什么形式？', choices: ['个人赛', '团队赛', '抢答赛', '案例分析'] },
        { title: '教育价值', description: '你会怎么增加教育价值？', choices: ['讲解正确答案', '讨论案例', '分享法律知识', '培养法治意识'] },
        { title: '持续学习', description: '你会怎么继续学习？', choices: ['建立学习资源', '定期举办活动', '培养兴趣', '扩大影响'] }
    ],
    17: [
        { title: '发起跨社团项目对接', description: '你会怎么发起一场高校跨社团可持续项目对接会？', choices: ['了解各社团的项目', '设计对接机制', '搭建合作平台', '促进沟通'] },
        { title: '对接方法', description: '你会怎么对接项目？', choices: ['按目标匹配', '按资源匹配', '按兴趣匹配', '按需求匹配'] },
        { title: '促进合作', description: '你会怎么促进合作？', choices: ['组织交流会', '提供合作指导', '搭建沟通渠道', '创造合作机会'] },
        { title: '支持项目', description: '你会怎么支持合作项目？', choices: ['提供资源', '协调沟通', '跟踪进度', '解决问题'] },
        { title: '扩大影响', description: '你会怎么扩大影响？', choices: ['分享成功案例', '建立合作网络', '持续对接', '推动更多合作'] }
    ]
};

// ===================== 生成关卡 =====================
function generateLevels(club) {
    const tpls = currentLang === 'zh' ? templates_zh : templates_en;
    const baseTemplates = tpls[club.id] || tpls[1];
    const allLevels = [];

    for (let i = 0; i < 10; i++) {
        const templateIndex = i % baseTemplates.length;
        const template = baseTemplates[templateIndex];
        const round = Math.floor(i / baseTemplates.length);

        let title = template.title;
        if (round > 0) {
            title = `${template.title} - ${t('advancedStage')}`;
        }

        allLevels.push({
            level: i + 1,
            title: title,
            description: template.description,
            choices: template.choices.map((choice, idx) => ({ text: choice, value: idx }))
        });
    }
    return allLevels;
}

// 辅助函数：为 prompt 生成英文关卡数据（仅在中文模式下使用）
function generateLevelsForPrompt(clubEn) {
    const baseTemplates = templates_en[clubEn.id] || templates_en[1];
    const allLevels = [];
    for (let i = 0; i < 10; i++) {
        const templateIndex = i % baseTemplates.length;
        const template = baseTemplates[templateIndex];
        const round = Math.floor(i / baseTemplates.length);
        let title = template.title;
        if (round > 0) title = `${template.title} - Advanced Stage`;
        allLevels.push({
            title: title,
            description: template.description,
            choices: template.choices.map((c, idx) => ({ text: c, value: idx }))
        });
    }
    return allLevels;
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

The person's choices in 10 levels:
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
