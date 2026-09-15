export default async function handler(req, res) {
    // 1. التأكد من أن الطلب القادم هو إرسال بيانات (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const userMessage = req.body.message;
    
    // 2. سحب المفتاح السري من البيئة المحمية للخادم (وليس من الكود المكشوف)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API key is missing in server' });
    }

    try {
        // 3. الاتصال الآمن بخوادم OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { 
                        role: "system", 
                        content: "أنت خبير محترف في الموارد البشرية وكتابة السير الذاتية المتوافقة مع أنظمة ATS. مهمتك مساعدة المستخدم في كتابة ملخصات مهنية قوية، واختيار كلمات مفتاحية. كن مباشراً وتحدث باللغة العربية بأسلوب ودود." 
                    },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();
        
        // 4. إرسال رد الذكاء الاصطناعي فقط إلى واجهة المستخدم
        res.status(200).json({ reply: data.choices[0].message.content });
        
    } catch (error) {
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب.' });
    }
}