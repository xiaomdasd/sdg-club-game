'use strict';

const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
    env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();

function buildFallbackText(event = {}) {
    const selectedClub = event.selectedClub || {};
    const mbti = selectedClub.mbti || 'ENFP';
    const clubName = selectedClub.name || 'the selected club';
    const lang = event.lang || 'en';

    if (lang === 'zh') {
        return `MBTI\n${mbti}。你在答题中的选择整体展现出与“${clubName}”相匹配的行为倾向，说明你可能更偏向这种类型的思考与行动方式。\n\nSkills\n- 善于围绕目标组织行动\n- 对社群、合作或公共议题有持续关注\n- 能在实践场景中保持参与和执行\n- 愿意把兴趣转化为长期投入\n\nInterests\n- 对${clubName}相关议题有明显兴趣\n- 喜欢有现实意义、能产生社会影响的活动\n- 更容易投入到有主题、有任务感的学习或协作环境\n\nCareer Advice\n- 可持续发展项目助理 - 公益组织或校园项目 - 适合把兴趣和执行力结合起来\n- 社群运营专员 - 教育或公益机构 - 适合持续推动活动参与和协作\n- 项目协调员 - 社会创新或青年发展项目 - 适合组织资源并推动落地\n- 内容策划 - 教育传播或公共倡导机构 - 适合把价值关注转成具体表达\n- 活动执行/志愿者管理 - 社区或 NGO - 适合在真实场景中发挥行动力`;
    }

    return `MBTI\n${mbti}. Your answers show behavioral tendencies that align well with ${clubName}, so this MBTI type is a solid fit.\n\nSkills\n- Organizing action around meaningful goals\n- Staying engaged in collaboration and community settings\n- Turning interests into consistent participation\n- Following through in practical project situations\n\nInterests\n- Social impact and sustainable development themes\n- Purpose-driven activities with visible outcomes\n- Learning and working environments built around collaboration\n\nCareer Advice\n- Sustainability project assistant - NGO or impact organization - fits your interest in practical social impact work\n- Community operations coordinator - education or youth programs - suits collaborative and people-facing strengths\n- Program coordinator - social innovation projects - matches structured follow-through and mission-driven work\n- Content planner - education or public-interest communication - connects values with communication\n- Event and volunteer coordinator - community or nonprofit teams - fits action-oriented, real-world engagement`;
}

exports.main = async (event = {}) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        return {
            ok: false,
            error: 'Missing DEEPSEEK_API_KEY in CloudBase function environment variables.'
        };
    }

    const prompt = typeof event.prompt === 'string' ? event.prompt.trim() : '';
    if (!prompt) {
        return {
            ok: false,
            error: 'Missing prompt.'
        };
    }

    const model = process.env.DEEPSEEK_MODEL || 'deepseek-chat';
    const url = 'https://api.deepseek.com/chat/completions';

    let mbtiText = '';
    let requestSource = 'deepseek';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an MBTI analysis assistant. Follow the requested language and section headings exactly.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek request failed with ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        mbtiText = data?.choices?.[0]?.message?.content || '';
    } catch (error) {
        requestSource = 'fallback';
        mbtiText = buildFallbackText(event);
    }

    const mbtiMatch = mbtiText.match(/\b([EI][NS][FT][PJ])\b/);

    const record = {
        selectedClub: event.selectedClub || null,
        answers: Array.isArray(event.answers) ? event.answers : [],
        lang: event.lang || 'en',
        mbti: mbtiMatch ? mbtiMatch[1] : null,
        mbtiText,
        source: requestSource,
        createdAt: new Date()
    };

    let saveResult = null;
    try {
        saveResult = await db.collection(process.env.RESULT_COLLECTION || 'game_results').add(record);
    } catch (error) {
        saveResult = {
            error: error.message
        };
    }

    return {
        ok: true,
        mbtiText,
        predictedMBTI: mbtiMatch ? mbtiMatch[1] : null,
        source: requestSource,
        saveResult
    };
};
