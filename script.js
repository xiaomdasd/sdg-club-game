// Gemini API配置
const GEMINI_API_KEY = 'AIzaSyCHcYxeBfvon-chg6VPmE5ILbKylfH49aM';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// 17个社团数据
const clubs = [
    {
        id: 1,
        sdg: 'SDG 1 No Poverty',
        name: 'Lift Up Club',
        activity: 'Campus Idle Goods Donation Drive',
        mbti: 'ESFJ',
        slogan: 'Small gifts, big warmth'
    },
    {
        id: 2,
        sdg: 'SDG 2 Zero Hunger',
        name: 'Food Saver Club',
        activity: 'Clean Plate Challenge & Awareness',
        mbti: 'ISFJ',
        slogan: 'Save every bite, fight hunger'
    },
    {
        id: 3,
        sdg: 'SDG 3 Good Health & Well-being',
        name: 'Well Youth Club',
        activity: 'Campus Mental Health Workshop',
        mbti: 'ENFJ',
        slogan: 'Nurture mind, thrive fully'
    },
    {
        id: 4,
        sdg: 'SDG 4 Quality Education',
        name: 'Bright Mind Club',
        activity: 'Community Academic Tutoring',
        mbti: 'INFJ',
        slogan: 'Knowledge lights up dreams'
    },
    {
        id: 5,
        sdg: 'SDG 5 Gender Equality',
        name: 'Equal Voice Club',
        activity: 'Gender Equality Talk',
        mbti: 'ENTP',
        slogan: 'Break bias, equal power for all'
    },
    {
        id: 6,
        sdg: 'SDG 6 Clean Water & Sanitation',
        name: 'Water Keeper Club',
        activity: 'Water-Saving & Quality Check',
        mbti: 'ISTJ',
        slogan: 'Save water, guard life\'s source'
    },
    {
        id: 7,
        sdg: 'SDG 7 Affordable & Clean Energy',
        name: 'Green Power Club',
        activity: 'Solar Device DIY Workshop',
        mbti: 'INTJ',
        slogan: 'Green energy, better future'
    },
    {
        id: 8,
        sdg: 'SDG 8 Decent Work & Growth',
        name: 'Career Boost Club',
        activity: 'Green Career Sharing Session',
        mbti: 'ENTJ',
        slogan: 'Green career, steady growth'
    },
    {
        id: 9,
        sdg: 'SDG 9 Industry, Innovation & Infra',
        name: 'Tech Up Club',
        activity: 'Upcycled Tech Creation Contest',
        mbti: 'INTP',
        slogan: 'Upcycle old parts, innovate new tech'
    },
    {
        id: 10,
        sdg: 'SDG 10 Reduced Inequalities',
        name: 'Inclusion Hub',
        activity: 'Barrier-Free Experience & Fellowship',
        mbti: 'ESFP',
        slogan: 'No barriers, full inclusion'
    },
    {
        id: 11,
        sdg: 'SDG 11 Sustainable Cities & Communities',
        name: 'Livable Community Club',
        activity: 'Corridor Green Beautification Volunteer',
        mbti: 'ISFP',
        slogan: 'Green our space, warm our home'
    },
    {
        id: 12,
        sdg: 'SDG 12 Responsible Consumption & Production',
        name: 'Circular Living Club',
        activity: 'Campus Sustainable Flea Market',
        mbti: 'ESTP',
        slogan: 'Swap, reuse, consume responsibly'
    },
    {
        id: 13,
        sdg: 'SDG 13 Climate Action',
        name: 'Climate Action Crew',
        activity: 'Carbon Footprint Calculation & Talk',
        mbti: 'INFP',
        slogan: 'Small acts, big climate impact'
    },
    {
        id: 14,
        sdg: 'SDG 14 Life Below Water',
        name: 'Ocean Guardian Club',
        activity: 'Marine Life Protection Exhibition',
        mbti: 'ENFP',
        slogan: 'Protect oceans, save marine life'
    },
    {
        id: 15,
        sdg: 'SDG 15 Life on Land',
        name: 'Earth Keeper Club',
        activity: 'Mountain Cleanup & Plant Protection',
        mbti: 'ESTJ',
        slogan: 'Clean lands, guard all creatures'
    },
    {
        id: 16,
        sdg: 'SDG 16 Peace, Justice & Institutions',
        name: 'Justice Youth Club',
        activity: 'Legal Knowledge Quiz',
        mbti: 'ISFP',
        slogan: 'Uphold justice, safeguard peace'
    },
    {
        id: 17,
        sdg: 'SDG 17 Partnerships for the Goals',
        name: 'Synergy Hub',
        activity: 'Inter-Club SDG Project Match',
        mbti: 'ENFP',
        slogan: 'Unite strengths, advance SDGs'
    }
];

// 为每个社团生成10个关卡
function generateLevels(club) {
    const levelTemplates = getLevelTemplates(club);
    
    // getLevelTemplates已经返回10个关卡，直接使用
    return levelTemplates.map((template, index) => ({
        level: index + 1,
        title: template.title,
        description: template.description,
        choices: template.choices.map((choice, idx) => ({
            text: choice,
            value: idx
        }))
    }));
}

// 根据社团类型生成关卡模板
function getLevelTemplates(club) {
    const templates = {
        // SDG 1 - No Poverty
        1: [
            {
                title: 'Preparing the Donation Drive',
                description: 'You are organizing a campus idle goods donation drive. How would you start?',
                choices: [
                    'Create a detailed plan and timeline, ensuring each step has a responsible person',
                    'Start promoting immediately to get students involved',
                    'First understand students\' needs and what they require',
                    'Start collecting items directly and adjust as you go'
                ]
            },
            {
                title: 'Handling Donated Items',
                description: 'Some of the collected items are damaged. How would you handle them?',
                choices: [
                    'Carefully categorize and repair items that can be fixed',
                    'Discard damaged items directly, keeping only the good ones',
                    'Ask professionals how to handle them',
                    'Organize volunteers to repair them together'
                ]
            },
            {
                title: 'Promoting the Activity',
                description: 'How would you let more people know about this activity?',
                choices: [
                    'Create beautiful posters and flyers to post around campus',
                    'Promote through social media and friend circles',
                    'Contact student council and clubs for collaborative promotion',
                    'Hold a small launch event to attract attention'
                ]
            },
            {
                title: 'Distributing Donated Items',
                description: 'How would you fairly distribute the collected items?',
                choices: [
                    'Prioritize those most in need based on survey results',
                    'Distribute randomly to ensure everyone has a chance',
                    'Set up an application process for those in need',
                    'Organize a lottery for fair distribution'
                ]
            },
            {
                title: 'Activity Summary',
                description: 'After the activity ends, how would you summarize it?',
                choices: [
                    'Record detailed activity data and analyze successes and shortcomings',
                    'Hold a thank-you event to appreciate all participants',
                    'Share activity photos and stories to spread positive energy',
                    'Plan the next activity for continuous improvement'
                ]
            }
        ],
        // SDG 2 - Zero Hunger
        2: [
            {
                title: 'Launching the Clean Plate Challenge',
                description: 'How would you start the "Clean Plate Challenge"?',
                choices: [
                    'First investigate campus waste situation and collect data',
                    'Start promoting immediately to get everyone involved',
                    'Design interesting challenge rules and reward mechanisms',
                    'Contact the cafeteria for collaborative promotion'
                ]
            },
            {
                title: 'Designing Challenge Rules',
                description: 'How would you make the challenge more fun and effective?',
                choices: [
                    'Set up a check-in mechanism to record daily clean plate status',
                    'Organize team competitions to add fun',
                    'Provide small rewards to motivate participants',
                    'Share knowledge and stories about saving food'
                ]
            },
            {
                title: 'Handling Food Waste',
                description: 'If you see classmates wasting food, what would you do?',
                choices: [
                    'Kindly remind them and share the importance of saving',
                    'Organize discussions to help everyone understand food\'s value',
                    'Design interesting interactions to raise awareness about waste',
                    'Explain the issue through data and facts'
                ]
            },
            {
                title: 'Expanding Impact',
                description: 'How would you get more people involved?',
                choices: [
                    'Create promotional videos to spread on social media',
                    'Invite celebrities or teachers to participate',
                    'Collaborate with other clubs to expand influence',
                    'Host themed events to attract attention'
                ]
            },
            {
                title: 'Continuous Improvement',
                description: 'How would you keep the activity effective?',
                choices: [
                    'Regularly evaluate effectiveness and adjust strategies',
                    'Establish long-term mechanisms for continuous promotion',
                    'Collect feedback and continuously improve',
                    'Cultivate habits to make saving natural'
                ]
            }
        ],
        // SDG 3 - Good Health & Well-being
        3: [
            {
                title: 'Planning Mental Health Workshop',
                description: 'How would you plan a mental health workshop?',
                choices: [
                    'First understand students\' mental health needs',
                    'Invite professional counselors to participate',
                    'Design highly interactive activity sessions',
                    'Prepare practical mental health resources'
                ]
            },
            {
                title: 'Choosing a Theme',
                description: 'What theme should the workshop focus on?',
                choices: [
                    'Stress management and coping strategies',
                    'Emotional regulation and mental health',
                    'Interpersonal relationships and communication skills',
                    'Self-awareness and growth'
                ]
            },
            {
                title: 'Activity Format',
                description: 'How would you make the workshop more effective?',
                choices: [
                    'Combine lectures with interactive activities',
                    'Use group discussions and sharing',
                    'Add games and experiential sessions',
                    'Provide one-on-one counseling opportunities'
                ]
            },
            {
                title: 'Creating a Safe Atmosphere',
                description: 'How would you make participants feel safe and comfortable?',
                choices: [
                    'Establish confidentiality and respect rules',
                    'Create a relaxed and friendly atmosphere',
                    'Encourage sharing without forcing',
                    'Provide support and understanding'
                ]
            },
            {
                title: 'Ongoing Support',
                description: 'How would you provide continuous support after the workshop?',
                choices: [
                    'Build a mental health resource library',
                    'Regularly host follow-up activities',
                    'Provide counseling channels and contact information',
                    'Establish a peer support network'
                ]
            }
        ],
        // SDG 4 - Quality Education
        4: [
            {
                title: 'Launching Community Tutoring Program',
                description: 'How would you start a community academic tutoring program?',
                choices: [
                    'First understand the learning needs of community students',
                    'Recruit capable volunteers',
                    'Design curriculum and teaching plans',
                    'Find suitable teaching venues'
                ]
            },
            {
                title: 'Matching Students and Tutors',
                description: 'How would you match students with suitable tutors?',
                choices: [
                    'Match based on subject and grade level',
                    'Consider learning styles and personalities',
                    'Let students and tutors choose each other',
                    'Match based on time and location'
                ]
            },
            {
                title: 'Designing Teaching Methods',
                description: 'How would you make tutoring more effective?',
                choices: [
                    'Personalized teaching tailored to individual needs',
                    'Use interactive and gamified methods',
                    'Encourage students to ask questions actively',
                    'Regularly assess learning progress'
                ]
            },
            {
                title: 'Inspiring Learning Interest',
                description: 'How would you make students interested in learning?',
                choices: [
                    'Connect knowledge with real life',
                    'Use interesting teaching materials',
                    'Set small goals and rewards',
                    'Share success stories and role models'
                ]
            },
            {
                title: 'Evaluation and Improvement',
                description: 'How would you continuously improve the program?',
                choices: [
                    'Regularly collect feedback from students and tutors',
                    'Evaluate learning outcomes and progress',
                    'Adjust teaching methods and content',
                    'Expand the program\'s impact'
                ]
            }
        ],
        // SDG 5 - Gender Equality
        5: [
            {
                title: 'Organizing Gender Equality Discussion',
                description: 'How would you organize a gender equality discussion?',
                choices: [
                    'Invite speakers from diverse backgrounds',
                    'Design interactive discussion sessions',
                    'Prepare relevant data and cases',
                    'Create an open and inclusive discussion atmosphere'
                ]
            },
            {
                title: 'Choosing Discussion Topic',
                description: 'What topic should be discussed?',
                choices: [
                    'Gender equality in the workplace',
                    'Gender bias in education',
                    'Social stereotypes',
                    'How to promote gender equality'
                ]
            },
            {
                title: 'Handling Different Perspectives',
                description: 'If different perspectives arise, what would you do?',
                choices: [
                    'Encourage rational discussion and debate',
                    'Guide everyone to understand different perspectives',
                    'Provide facts and data support',
                    'Emphasize respect and understanding'
                ]
            },
            {
                title: 'Taking Action',
                description: 'How would you take action after the discussion?',
                choices: [
                    'Develop an action plan',
                    'Organize related activities',
                    'Build a support network',
                    'Continue to pay attention and advocate'
                ]
            },
            {
                title: 'Expanding Impact',
                description: 'How would you get more people to care about gender equality?',
                choices: [
                    'Spread through social media',
                    'Collaborate with other organizations',
                    'Host more activities',
                    'Cultivate advocates'
                ]
            }
        ],
        // SDG 6 - Clean Water & Sanitation
        6: [
            {
                title: 'Launching Water Conservation Activity',
                description: 'How would you start a water conservation activity?',
                choices: [
                    'First investigate campus water usage',
                    'Design water conservation challenges',
                    'Promote water conservation knowledge',
                    'Install water-saving devices'
                ]
            },
            {
                title: 'Water Quality Testing',
                description: 'How would you organize a water quality testing activity?',
                choices: [
                    'Learn water quality testing methods',
                    'Invite professionals to guide',
                    'Organize students to participate in testing',
                    'Record and share test results'
                ]
            },
            {
                title: 'Raising Awareness',
                description: 'How would you raise everyone\'s water conservation awareness?',
                choices: [
                    'Share data on water scarcity',
                    'Demonstrate actual water-saving effects',
                    'Organize experiential activities',
                    'Set water conservation goals'
                ]
            },
            {
                title: 'Innovative Methods',
                description: 'How would you innovate water conservation methods?',
                choices: [
                    'Collect rainwater for irrigation',
                    'Modify water-using equipment',
                    'Recycle water resources',
                    'Design water-saving systems'
                ]
            },
            {
                title: 'Sustained Action',
                description: 'How would you make water conservation a habit?',
                choices: [
                    'Establish long-term mechanisms',
                    'Regular reminders and promotion',
                    'Set up reward mechanisms',
                    'Cultivate water conservation culture'
                ]
            }
        ],
        // SDG 7 - Affordable & Clean Energy
        7: [
            {
                title: 'Planning Solar DIY Workshop',
                description: 'How would you plan a solar device DIY workshop?',
                choices: [
                    'Design simple and easy projects',
                    'Prepare materials and tools',
                    'Invite experts to guide',
                    'Ensure safety measures'
                ]
            },
            {
                title: 'Choosing Projects',
                description: 'What projects should be done?',
                choices: [
                    'Solar charger',
                    'Solar light',
                    'Solar fan',
                    'Solar phone stand'
                ]
            },
            {
                title: 'Teaching Methods',
                description: 'How would you help participants learn?',
                choices: [
                    'Explain step by step in detail',
                    'Provide illustrated tutorials',
                    'Live demonstration and guidance',
                    'Encourage hands-on practice'
                ]
            },
            {
                title: 'Application and Promotion',
                description: 'How would you promote clean energy?',
                choices: [
                    'Showcase project results',
                    'Share usage experiences',
                    'Organize more activities',
                    'Build a learning community'
                ]
            },
            {
                title: 'Continuous Innovation',
                description: 'How would you continuously innovate?',
                choices: [
                    'Explore new projects',
                    'Improve existing designs',
                    'Share experiences and knowledge',
                    'Cultivate innovative thinking'
                ]
            }
        ],
        // SDG 8 - Decent Work & Growth
        8: [
            {
                title: 'Organizing Green Career Sharing Session',
                description: 'How would you organize a green career sharing session?',
                choices: [
                    'Invite professionals from different fields',
                    'Design interactive sessions',
                    'Prepare career information',
                    'Create a communication platform'
                ]
            },
            {
                title: 'Choosing Speakers',
                description: 'Who should be invited as speakers?',
                choices: [
                    'Environmental industry practitioners',
                    'Sustainable development experts',
                    'Entrepreneurs and business owners',
                    'Representatives from different professions'
                ]
            },
            {
                title: 'Content Design',
                description: 'What content should the sharing session include?',
                choices: [
                    'Career development paths',
                    'Skill requirements',
                    'Industry prospects',
                    'Real work experiences'
                ]
            },
            {
                title: 'Interactive Sessions',
                description: 'How would you increase interaction?',
                choices: [
                    'Q&A sessions',
                    'Group discussions',
                    'Career counseling',
                    'Networking'
                ]
            },
            {
                title: 'Ongoing Support',
                description: 'How would you provide continuous support?',
                choices: [
                    'Build a career resource library',
                    'Provide internship opportunities',
                    'Organize follow-up activities',
                    'Establish a mentor network'
                ]
            }
        ],
        // SDG 9 - Industry, Innovation & Infra
        9: [
            {
                title: 'Launching Upcycling Contest',
                description: 'How would you launch an upcycled tech creation contest?',
                choices: [
                    'Design contest rules and themes',
                    'Prepare materials and tools',
                    'Invite judges',
                    'Promote the contest'
                ]
            },
            {
                title: 'Choosing Theme',
                description: 'What should the contest focus on?',
                choices: [
                    'Electronic device upcycling',
                    'Creative tech applications',
                    'Environmental technology',
                    'Practical innovation'
                ]
            },
            {
                title: 'Judging Criteria',
                description: 'How would you judge the works?',
                choices: [
                    'Innovation and creativity',
                    'Practicality and functionality',
                    'Environmental and sustainability',
                    'Technical difficulty'
                ]
            },
            {
                title: 'Supporting Participants',
                description: 'How would you support participants?',
                choices: [
                    'Provide technical guidance',
                    'Organize training workshops',
                    'Provide materials and tools',
                    'Build a communication platform'
                ]
            },
            {
                title: 'Showcasing Results',
                description: 'How would you showcase contest results?',
                choices: [
                    'Hold an exhibition',
                    'Create a portfolio',
                    'Share success stories',
                    'Promote outstanding works'
                ]
            }
        ],
        // SDG 10 - Reduced Inequalities
        10: [
            {
                title: 'Organizing Barrier-Free Experience Activity',
                description: 'How would you organize a barrier-free experience and fellowship activity?',
                choices: [
                    'Design experience sessions',
                    'Invite people from diverse backgrounds',
                    'Create an inclusive environment',
                    'Promote understanding and communication'
                ]
            },
            {
                title: 'Experience Design',
                description: 'What experiences should be designed?',
                choices: [
                    'Barrier-free facility experiences',
                    'Different ability experiences',
                    'Cultural exchange',
                    'Common activities'
                ]
            },
            {
                title: 'Breaking Barriers',
                description: 'How would you break barriers?',
                choices: [
                    'Provide barrier-free facilities',
                    'Create an inclusive environment',
                    'Promote understanding and respect',
                    'Build a support network'
                ]
            },
            {
                title: 'Building Connections',
                description: 'How would you build connections?',
                choices: [
                    'Organize fellowship activities',
                    'Promote communication and dialogue',
                    'Build friendships',
                    'Maintain continuous interaction'
                ]
            },
            {
                title: 'Sustained Impact',
                description: 'How would you create sustained impact?',
                choices: [
                    'Establish long-term projects',
                    'Cultivate advocates',
                    'Promote policy changes',
                    'Expand impact scope'
                ]
            }
        ],
        // SDG 11 - Sustainable Cities & Communities
        11: [
            {
                title: 'Launching Corridor Beautification Project',
                description: 'How would you launch a corridor green beautification volunteer activity?',
                choices: [
                    'Design beautification plan',
                    'Prepare plants and materials',
                    'Recruit volunteers',
                    'Obtain permission'
                ]
            },
            {
                title: 'Designing the Plan',
                description: 'How would you design the beautification plan?',
                choices: [
                    'Choose suitable plants',
                    'Design layout',
                    'Consider maintenance',
                    'Create a beautiful environment'
                ]
            },
            {
                title: 'Organizing Activities',
                description: 'How would you organize the beautification activity?',
                choices: [
                    'Divide work and collaborate',
                    'Provide guidance',
                    'Ensure safety',
                    'Create fun'
                ]
            },
            {
                title: 'Maintenance Management',
                description: 'How would you maintain the beautification results?',
                choices: [
                    'Establish maintenance plan',
                    'Assign responsibilities',
                    'Regular inspections',
                    'Continuous improvement'
                ]
            },
            {
                title: 'Expanding Impact',
                description: 'How would you expand the impact?',
                choices: [
                    'Promote to other areas',
                    'Share experiences',
                    'Organize more activities',
                    'Build beautification culture'
                ]
            }
        ],
        // SDG 12 - Responsible Consumption & Production
        12: [
            {
                title: 'Organizing Campus Flea Market',
                description: 'How would you organize a campus sustainable flea market?',
                choices: [
                    'Choose venue and time',
                    'Recruit sellers',
                    'Design rules',
                    'Promote the market'
                ]
            },
            {
                title: 'Market Rules',
                description: 'What rules should be set?',
                choices: [
                    'Encourage second-hand items',
                    'Ban disposable products',
                    'Promote sustainable concepts',
                    'Ensure fair trading'
                ]
            },
            {
                title: 'Attracting Participation',
                description: 'How would you attract more people to participate?',
                choices: [
                    'Promote environmental concepts',
                    'Provide fun activities',
                    'Set up rewards',
                    'Create social atmosphere'
                ]
            },
            {
                title: 'Educational Value',
                description: 'How would you increase educational value?',
                choices: [
                    'Share sustainable knowledge',
                    'Demonstrate recycling',
                    'Discuss consumption concepts',
                    'Spread environmental concepts'
                ]
            },
            {
                title: 'Sustained Impact',
                description: 'How would you create sustained impact?',
                choices: [
                    'Hold regularly',
                    'Build a platform',
                    'Cultivate habits',
                    'Expand influence'
                ]
            }
        ],
        // SDG 13 - Climate Action
        13: [
            {
                title: 'Launching Carbon Footprint Calculation Activity',
                description: 'How would you launch a carbon footprint calculation and discussion activity?',
                choices: [
                    'Learn calculation methods',
                    'Design calculation tools',
                    'Organize discussion sessions',
                    'Prepare relevant materials'
                ]
            },
            {
                title: 'Calculation Methods',
                description: 'How would you calculate carbon footprint?',
                choices: [
                    'Use online tools',
                    'Design simple questionnaires',
                    'Record daily activities',
                    'Analyze data'
                ]
            },
            {
                title: 'Discussion Content',
                description: 'What should be discussed?',
                choices: [
                    'Personal carbon footprint',
                    'Reduction methods',
                    'Climate change impacts',
                    'Action plans'
                ]
            },
            {
                title: 'Taking Action',
                description: 'How would you take action?',
                choices: [
                    'Develop reduction plans',
                    'Change lifestyle habits',
                    'Promote to others',
                    'Track continuously'
                ]
            },
            {
                title: 'Expanding Impact',
                description: 'How would you expand the impact?',
                choices: [
                    'Share experiences',
                    'Organize more activities',
                    'Build a community',
                    'Promote change'
                ]
            }
        ],
        // SDG 14 - Life Below Water
        14: [
            {
                title: 'Organizing Marine Protection Exhibition',
                description: 'How would you organize a marine life protection exhibition?',
                choices: [
                    'Collect relevant materials',
                    'Design exhibition content',
                    'Prepare display materials',
                    'Invite experts'
                ]
            },
            {
                title: 'Exhibition Content',
                description: 'What should be displayed?',
                choices: [
                    'Marine biodiversity',
                    'Marine pollution issues',
                    'Protection measures',
                    'Success stories'
                ]
            },
            {
                title: 'Interactive Design',
                description: 'How would you increase interaction?',
                choices: [
                    'Set up interactive exhibits',
                    'Organize experiential activities',
                    'Provide educational materials',
                    'Encourage participation'
                ]
            },
            {
                title: 'Call to Action',
                description: 'How would you call for action?',
                choices: [
                    'Provide action suggestions',
                    'Organize volunteer activities',
                    'Build protection network',
                    'Continue to pay attention'
                ]
            },
            {
                title: 'Sustained Impact',
                description: 'How would you create sustained impact?',
                choices: [
                    'Hold activities regularly',
                    'Establish protection projects',
                    'Cultivate awareness',
                    'Expand influence'
                ]
            }
        ],
        // SDG 15 - Life on Land
        15: [
            {
                title: 'Organizing Mountain Cleanup Activity',
                description: 'How would you organize a mountain cleanup and plant protection activity?',
                choices: [
                    'Choose location',
                    'Prepare tools',
                    'Recruit volunteers',
                    'Ensure safety'
                ]
            },
            {
                title: 'Activity Content',
                description: 'What should the activity include?',
                choices: [
                    'Clean up trash',
                    'Protect plants',
                    'Learn ecological knowledge',
                    'Record observations'
                ]
            },
            {
                title: 'Safety Education',
                description: 'How would you ensure safety?',
                choices: [
                    'Provide safety training',
                    'Prepare first aid supplies',
                    'Set safety rules',
                    'Equip with professionals'
                ]
            },
            {
                title: 'Ecological Education',
                description: 'How would you increase educational value?',
                choices: [
                    'Learn plant knowledge',
                    'Understand ecosystems',
                    'Discuss protection importance',
                    'Cultivate environmental awareness'
                ]
            },
            {
                title: 'Sustained Protection',
                description: 'How would you sustain protection?',
                choices: [
                    'Regular activities',
                    'Establish protection projects',
                    'Cultivate habits',
                    'Expand influence'
                ]
            }
        ],
        // SDG 16 - Peace, Justice & Institutions
        16: [
            {
                title: 'Organizing Legal Knowledge Quiz',
                description: 'How would you organize a legal knowledge quiz?',
                choices: [
                    'Design questions',
                    'Set rules',
                    'Invite judges',
                    'Promote the quiz'
                ]
            },
            {
                title: 'Question Design',
                description: 'What questions should be included?',
                choices: [
                    'Basic legal knowledge',
                    'Real cases',
                    'Rights and obligations',
                    'Legal procedures'
                ]
            },
            {
                title: 'Quiz Format',
                description: 'What format should be adopted?',
                choices: [
                    'Individual competition',
                    'Team competition',
                    'Quick answer',
                    'Case analysis'
                ]
            },
            {
                title: 'Educational Value',
                description: 'How would you increase educational value?',
                choices: [
                    'Explain correct answers',
                    'Discuss cases',
                    'Share legal knowledge',
                    'Cultivate legal awareness'
                ]
            },
            {
                title: 'Continuous Learning',
                description: 'How would you continue learning?',
                choices: [
                    'Build learning resources',
                    'Hold activities regularly',
                    'Cultivate interest',
                    'Expand influence'
                ]
            }
        ],
        // SDG 17 - Partnerships for the Goals
        17: [
            {
                title: 'Launching Inter-Club SDG Project Matching',
                description: 'How would you launch inter-club SDG project matching?',
                choices: [
                    'Understand each club\'s projects',
                    'Design matching mechanism',
                    'Build collaboration platform',
                    'Promote communication'
                ]
            },
            {
                title: 'Matching Methods',
                description: 'How would you match projects?',
                choices: [
                    'Match based on goals',
                    'Match based on resources',
                    'Match based on interests',
                    'Match based on needs'
                ]
            },
            {
                title: 'Promoting Collaboration',
                description: 'How would you promote collaboration?',
                choices: [
                    'Organize meetups',
                    'Provide collaboration guidance',
                    'Build communication channels',
                    'Create collaboration opportunities'
                ]
            },
            {
                title: 'Supporting Projects',
                description: 'How would you support collaborative projects?',
                choices: [
                    'Provide resources',
                    'Coordinate communication',
                    'Track progress',
                    'Solve problems'
                ]
            },
            {
                title: 'Expanding Impact',
                description: 'How would you expand the impact?',
                choices: [
                    'Share success stories',
                    'Build collaboration network',
                    'Continue matching',
                    'Promote more collaboration'
                ]
            }
        ]
    };
    
    // 为每个社团生成10个关卡，重复使用模板并添加变化
    const baseTemplates = templates[club.id] || templates[1];
    const allLevels = [];
    
    for (let i = 0; i < 10; i++) {
        const templateIndex = i % baseTemplates.length;
        const template = baseTemplates[templateIndex];
        const round = Math.floor(i / baseTemplates.length);
        
        // If it's the second round or more, add variation identifier
        let title = template.title;
        if (round > 0) {
            title = `${template.title} - Advanced Stage`;
        }
        
        allLevels.push({
            title: title,
            description: template.description,
            choices: template.choices
        });
    }
    
    return allLevels;
}

// 游戏状态
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

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    // 显示开始界面
    showScreen('start-screen');
    
    // 添加欢迎角色动画
    const welcomeChar = document.querySelector('.welcome-character');
    if (welcomeChar) {
        welcomeChar.style.animation = 'bounce 2s ease-in-out infinite, rotate 4s linear infinite';
    }
    
    // 绑定事件
    document.getElementById('start-btn').addEventListener('click', () => {
        // 添加按钮点击动画
        const btn = document.getElementById('start-btn');
        btn.style.animation = 'celebrate 0.5s ease-in-out';
        
        // 触发角色动画
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
        
        // 重置角色动画
        const welcomeChar = document.querySelector('.welcome-character');
        if (welcomeChar) {
            welcomeChar.style.animation = 'bounce 2s ease-in-out infinite, rotate 4s linear infinite';
        }
    });
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
    
    // 添加角色动画
    const headerChar = document.querySelector('.header-character');
    if (headerChar) {
        headerChar.style.animation = 'hop 0.5s ease-in-out';
        setTimeout(() => {
            headerChar.style.animation = 'hop 2s ease-in-out infinite';
        }, 500);
    }
}

function renderClubGrid() {
    const grid = document.getElementById('club-grid');
    grid.innerHTML = '';
    
    const clubIcons = {
        1: '🎁',  // No Poverty - donation / gift
        2: '🍽️', // Zero Hunger - food
        3: '🧠',  // Health & Well-being - mental health
        4: '📚',  // Quality Education
        5: '⚖️',  // Gender Equality / justice
        6: '💧',  // Clean Water
        7: '🔆',  // Clean Energy
        8: '💼',  // Decent Work
        9: '💡',  // Innovation
        10: '🤝', // Inclusion
        11: '🏙️',// Sustainable Cities
        12: '♻️', // Responsible Consumption
        13: '🌍', // Climate Action
        14: '🐠', // Life Below Water
        15: '🌳', // Life on Land
        16: '🕊️',// Peace & Justice
        17: '🤲'  // Partnerships
    };
    
    clubs.forEach(club => {
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
        
        card.addEventListener('click', () => {
            selectClub(club);
        });
        
        grid.appendChild(card);
    });
}

function selectClub(club) {
    gameState.selectedClub = club;
    gameState.levels = generateLevels(club);
    gameState.currentLevel = 0;
    gameState.choices = [];
    
    // 高亮选中的卡片
    document.querySelectorAll('.club-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // 添加选择动画
    event.currentTarget.style.animation = 'celebrate 0.6s ease-in-out';
    
    // 触发角色动画
    const headerChar = document.querySelector('.header-character');
    if (headerChar) {
        headerChar.style.animation = 'successJump 0.8s ease-in-out';
    }
    
    // 延迟一下再开始游戏，让用户看到选中效果
    setTimeout(() => {
        startGame();
    }, 800);
}

function startGame() {
    showScreen('game-screen');
    document.getElementById('current-club-name').textContent = gameState.selectedClub.name;
    document.getElementById('current-club-slogan').textContent = gameState.selectedClub.slogan;
    
    loadLevel(0);
}

function loadLevel(levelIndex) {
    if (levelIndex >= gameState.levels.length) {
        finishGame();
        return;
    }
    
    gameState.currentLevel = levelIndex;
    const level = gameState.levels[levelIndex];
    
    // 更新进度
    const progress = ((levelIndex + 1) / gameState.levels.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Level ${levelIndex + 1}/${gameState.levels.length}`;
    
    // 固定的疯狂动物城风格NPC搭档（减少角色数量，画面更干净）
    const npcQuestion = { emoji: '🦓', name: 'Zebra Coordinator', role: 'Order-loving Organizer' };
    const npcAnswer = { emoji: '🐰', name: 'Rabbit Officer', role: 'Energetic Rookie from Zootopia PD' };
    
    // 显示关卡内容
    const container = document.getElementById('level-container');
    container.innerHTML = `
        <div class="npc-dialogue">
            <div class="npc-dialogue-main">
                <!-- 左侧：提问 NPC + 问题气泡 -->
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

                <!-- 右侧：回答 NPC + 选项列表 -->
                <div class="npc-column npc-column-answer">
                    <div class="npc-avatar-block npc-avatar-block-answer">
                        <div class="npc-avatar npc-avatar-answer">${npcAnswer.emoji}</div>
                        <div class="npc-meta npc-meta-answer">
                            <div class="npc-name">${npcAnswer.name}</div>
                            <div class="npc-role">${npcAnswer.role}</div>
                        </div>
                    </div>
                    <div class="player-choices">
                        <div class="player-label">Choose how this NPC replies</div>
                        <div class="level-choices">
                            ${level.choices.map((choice, idx) => `
                                <button class="choice-btn" data-choice="${idx}">
                                    ${choice.text}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 绑定选择事件
    container.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const choiceIndex = parseInt(e.target.dataset.choice);
            selectChoice(levelIndex, choiceIndex);
        });
        
        // 添加悬停效果
        btn.addEventListener('mouseenter', () => {
            const char = container.querySelector('.level-character');
            if (char) {
                char.style.transform = 'scale(1.1)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            const char = container.querySelector('.level-character');
            if (char) {
                char.style.transform = 'scale(1)';
            }
        });
    });
    
    // 隐藏/显示按钮
    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('finish-game-btn').style.display = 'none';
}

function selectChoice(levelIndex, choiceIndex) {
    // 记录选择
    gameState.choices[levelIndex] = choiceIndex;
    
    // 高亮选中的选项
    document.querySelectorAll('.choice-btn').forEach((btn, idx) => {
        if (idx === choiceIndex) {
            btn.classList.add('selected');
            // 添加选择动画效果
            btn.style.animation = 'celebrate 0.5s ease-in-out';
            setTimeout(() => {
                btn.style.animation = '';
            }, 500);
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 触发角色庆祝动画
    const levelChar = document.querySelector('.level-character');
    if (levelChar) {
        // 轻微弹跳即可，不再整圈旋转
        levelChar.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            levelChar.style.animation = 'pulse 2s ease-in-out infinite, wiggle 3s ease-in-out infinite';
        }, 600);
    }
    
    // 自动跳转到下一关或结束游戏（保留一点动画时间）
    setTimeout(() => {
        if (levelIndex === gameState.levels.length - 1) {
            finishGame();
        } else {
            loadLevel(levelIndex + 1);
        }
    }, 700);
}

function finishGame() {
    showScreen('result-screen');
    
    // 触发庆祝动画
    const celebChars = document.querySelectorAll('.celeb-char');
    celebChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.animation = 'celebrate 1s ease-in-out infinite, float 3s ease-in-out infinite';
        }, index * 100);
    });
    
    predictMBTI();
}

// Simple career suggestions fallback map by MBTI type
const MBTI_CAREER_MAP = {
    ESTP: [
        'Entrepreneur / Startup Founder',
        'Sales or Business Development Specialist',
        'Project Manager for Fast‑paced Teams',
        'Event Planner or Experiential Marketing Lead',
        'Operations Manager in Retail or Hospitality'
    ],
    ESFP: [
        'Performer or Entertainer',
        'Public Relations or Brand Ambassador',
        'Tourism / Travel Consultant',
        'Event Host or Community Manager',
        'Early Childhood Educator'
    ],
    ENFP: [
        'Creative Director or Content Strategist',
        'Counselor or Coach',
        'NGO / Social Innovation Project Lead',
        'Marketing or Product Evangelist',
        'Start‑up Founder in Impact Fields'
    ],
    ENTP: [
        'Innovation Consultant',
        'Product Manager in Tech',
        'Strategy or Management Consultant',
        'Startup Founder',
        'Media / Debate / Podcast Host'
    ],
    ESFJ: [
        'HR or Talent Development Specialist',
        'Teacher or School Administrator',
        'Community / Program Coordinator',
        'Customer Success Manager',
        'Healthcare or Nursing Roles'
    ],
    ISFJ: [
        'Nurse or Healthcare Support',
        'Administrative or Executive Assistant',
        'Librarian or Archivist',
        'Primary School Teacher',
        'Social Worker'
    ],
    ENFJ: [
        'Teacher or Lecturer',
        'HR / Organizational Development',
        'Non‑profit or Community Leader',
        'Career or Life Coach',
        'Team Lead in People‑centric Roles'
    ],
    INFJ: [
        'Psychologist or Counselor',
        'Writer or Editor',
        'UX Researcher',
        'Non‑profit Strategist',
        'Education Program Designer'
    ],
    ISTJ: [
        'Accountant or Auditor',
        'Data / Records Manager',
        'Quality Assurance Specialist',
        'Logistics or Supply Chain Planner',
        'Civil Servant in Administrative Roles'
    ],
    INTJ: [
        'Data Scientist or Analyst',
        'Researcher or Academic',
        'Strategy or Product Manager',
        'Systems Architect',
        'Consultant in Tech or Finance'
    ],
    ENTJ: [
        'Executive or Department Manager',
        'Business Strategy Consultant',
        'Product Owner / Director',
        'Entrepreneur or Venture Builder',
        'Operations Director'
    ],
    INTP: [
        'Research Scientist',
        'Software or Systems Architect',
        'Data Analyst',
        'R&D Engineer',
        'Professor or Theorist'
    ],
    ISFP: [
        'Designer (Graphic / UI / Fashion)',
        'Photographer or Videographer',
        'Art Therapist',
        'Landscape or Interior Designer',
        'Craftsperson or Artisan'
    ],
    ISTP: [
        'Engineer or Technician',
        'Pilot or Driver',
        'Mechanic or Maker',
        'Emergency Response Roles',
        'Security or Forensics Specialist'
    ],
    INFP: [
        'Writer, Poet, or Novelist',
        'Counselor or Therapist',
        'NGO / Social Impact Worker',
        'Content Creator in Culture or Education',
        'Game / Narrative Designer'
    ],
    ESTJ: [
        'Operations or Plant Manager',
        'Project Manager',
        'Police / Military Officer',
        'School Principal',
        'Banking / Finance Supervisor'
    ],
    INTJ_AUX: [] // placeholder so map access is safe even if type missing
};

function buildCareerListHtml(mbti) {
    const list = MBTI_CAREER_MAP[mbti] || [];
    if (!list.length) return '';

    const items = list.map(item => `<li>${item}</li>`).join('');
    return `
        <div style="margin-top: 24px;">
            <h4 style="margin-bottom: 10px;">Suggested Career Paths for ${mbti}</h4>
            <ul style="margin-left: 20px; line-height: 1.7;">
                ${items}
            </ul>
        </div>
    `;
}

async function predictMBTI() {
    const resultDiv = document.getElementById('mbti-result');
    resultDiv.innerHTML = '<div class="loading">Analyzing your MBTI type...</div>';
    
    try {
        // 构建提示词
        const prompt = buildMBTIPrompt();
        
        // 调用Gemini API
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const mbtiText = data.candidates[0].content.parts[0].text;
        
        // 提取MBTI类型（尝试从响应中提取）
        const mbtiMatch = mbtiText.match(/\b([EI][NS][FT][PJ])\b/);
        const predictedMBTI = mbtiMatch ? mbtiMatch[1] : gameState.selectedClub.mbti;
        const careerHtml = buildCareerListHtml(predictedMBTI);
        
        // Display results (MBTI + skills/interests/career advice)
        resultDiv.innerHTML = `
            <div class="mbti-card">${predictedMBTI}</div>
            <div class="mbti-description">
                <h3>Your MBTI, Skills, Interests & Career Advice: ${predictedMBTI}</h3>
                <p>${mbtiText}</p>
                ${careerHtml}
                <p style="margin-top: 20px; font-style: italic; color: #888;">
                    The typical MBTI type for the club "${gameState.selectedClub.name}" you chose is: ${gameState.selectedClub.mbti}
                </p>
            </div>
        `;
    } catch (error) {
        console.error('MBTI Prediction Error:', error);
        // If API call fails, display default result + static career suggestions,
        // and still show Skills & Interests sections in a generic way.
        const fallbackMBTI = gameState.selectedClub.mbti;
        const careerHtml = buildCareerListHtml(fallbackMBTI);
        resultDiv.innerHTML = `
            <div class="mbti-card">${fallbackMBTI}</div>
            <div class="mbti-description">
                <h3>Your MBTI, Skills, Interests & Career Advice: ${fallbackMBTI}</h3>
                <p>Based on your choices in the "${gameState.selectedClub.name}" club activities, your MBTI type is likely <strong>${fallbackMBTI}</strong>.</p>

                <h4 style="margin-top: 18px; margin-bottom: 8px;">Skills</h4>
                <p>People with MBTI type ${fallbackMBTI} usually develop strengths that fit this type's way of observing the world and making decisions, such as using their values to guide actions, working reliably with others, and caring about real‑world impact. Your gameplay choices around SDG activities also show a willingness to plan, coordinate and follow through on meaningful projects.</p>

                <h4 style="margin-top: 18px; margin-bottom: 8px;">Interests</h4>
                <p>Your interest in the "${gameState.selectedClub.activity}" activity suggests you may enjoy topics related to sustainable development, community building and helping others. People of type ${fallbackMBTI} often prefer environments where they can see concrete results, support people around them and contribute to long‑term positive change.</p>

                ${careerHtml}
                <p style="margin-top: 20px;">This type typically matches people who choose this club, as the club's activities and values align with the traits of ${fallbackMBTI} type.</p>
            </div>
        `;
    }
}

function buildMBTIPrompt() {
    const club = gameState.selectedClub;
    let prompt = `You are an MBTI personality type analysis expert. Please analyze a person's MBTI type based on the following information:

Selected Club: ${club.name} (${club.sdg})
Club Activity: ${club.activity}
Club Slogan: ${club.slogan}
Club Typical MBTI Type: ${club.mbti}

The person's choices in 10 levels:
`;

    gameState.levels.forEach((level, idx) => {
        const choiceIndex = gameState.choices[idx] || 0;
        const choice = level.choices[choiceIndex];
        prompt += `\nLevel ${idx + 1}: ${level.title}\n`;
        prompt += `Question: ${level.description}\n`;
        prompt += `Choice: ${choice.text}\n`;
    });

    prompt += `\nThen, based on this MBTI type, the SDG club context above and the behavioral tendencies reflected in these choices, please respond in FOUR clearly separated sections in English:
1. MBTI: Clearly state the MBTI type as four letters (e.g. ENFP) and give a brief summary.
2. Skills: Summarize this person's likely strengths and core skills (3–6 bullet points).
3. Interests: Describe this person's likely interests, motivations and preferred working/learning environments (3–6 bullet points).
4. Career Advice: Recommend 5–8 specific, concrete future career paths or job roles that would be suitable for this person. These roles MUST simultaneously fit:
   - this person's MBTI type, AND
   - the SDG theme and club activity context given above (e.g. related industries, organizations or job families).
   For each role, follow this structure: "Job title – typical organization/industry – 1–2 sentences on why this matches both the MBTI and the chosen SDG club". Use very concrete titles (for example "Sustainability Analyst at a renewable energy company" instead of vague phrases like "work in sustainability").

Use clear headings like "MBTI", "Skills", "Interests" and "Career Advice" so it is easy to read.`;

    return prompt;
}

function resetGame() {
    gameState = {
        selectedClub: null,
        currentLevel: 0,
        levels: [],
        choices: []
    };
}
