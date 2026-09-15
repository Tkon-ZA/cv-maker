export default async function handler(req, res) {
    // السماح بالطلبات فقط
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ reply: 'خطأ: مفتاح الـ API غير موجود في إعدادات الخادم.' });
        }

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
                        content: "أنت خبير محترف في الموارد البشرية وكتابة السير الذاتية المتوافقة مع أنظمة ATS. ساعد المستخدم في كتابة ملخصات مهنية وتقديم نصائح توظيفية باللغة العربية." 
                    },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ reply: "خطأ من OpenAI: " + data.error.message });
        }

        const replyText = data.choices[0].message.content;
        return res.status(200).json({ reply: replyText });

    } catch (error) {
        return res.status(500).json({ reply: 'حدث خطأ تقني أثناء الاتصال بالخادم الداخلي.' });
    }
}
