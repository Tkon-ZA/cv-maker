export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        const text = message ? message.trim().toLowerCase() : "";

        let replyText = "";

        // محرك استجابة ذكي وموسع
        if (text.includes('ملخص') || text.includes('summary')) {
            replyText = "لصياغة ملخص احترافي، يفضل أن يتضمن: سنوات الخبرة، المجالات البارزة، وأبرز الإنجازات. هل ترغب في أن أقترح عليك نصاً جاهزاً لمجال معين؟";
        } 
        else if (text.includes('مبرمج') || text.includes('تقني') || text.includes('developer')) {
            replyText = "إليك مقترح لملخص مبرمج:\n'مهندس برمجيات محترف بخبرة عملية في تطوير تطبيقات الويب والواجهات الأمامية والخلفية، مع التركيز على كتابة أكواد نظيفة وقابلة للتوسع وفق معايير الجودة العالية.'";
        }
        else if (text.includes('ats') || text.includes('أنظمة')) {
            replyText = "نظام الـ ATS (Applicant Tracking System) هو نظام إلكتروني تفحصه الشركات لفرز السير الذاتية تلقائياً. لضمان تجاوزه، تجنب الأشكال الرسومية المعقدة واستخدم الكلمات المفتاحية الوظيفية الموجودة في إعلان الوظيفة.";
        }
        else if (text.includes('مهارات') || text.includes('skills')) {
            replyText = "أفضل طريقة لعرض المهارات هي تقسيمها إلى:\n1. مهارات تقنية (Hard Skills): مثل لغات البرمجة، الأدوات، البرامج.\n2. مهارات شخصية (Soft Skills): مثل إدارة الوقت، العمل الجماعي، حل المشكلات.";
        }
        else if (text.includes('أين') || text.includes('اين') || text.includes('من') || text.includes('ما هو')) {
            replyText = `سؤالك عن "${message}": بصفتي خبيراً متخصصاً في إعداد السير الذاتية وتطوير المسار المهني، أنصحك بالتركيز على إبراز خبراتك ذات الصلة بهذا المجال في سيرتك الذاتية لتعزيز فرص قبولك!`;
        }
        else if (text.includes('مرحبا') || text.includes('السلام') || text.includes('هلا') || text.includes('hi')) {
            replyText = "أهلاً بك! أنا خبير التوظيف الذكي ومساعدك الشخصي لبناء سيرة ذاتية تنافسية ومقاومة لأنظمة الـ ATS. كيف يمكنني إفادتك اليوم؟";
        }
        else {
            replyText = `نصيحة مهنية بناءً على استفسارك "${message}": احرص دائماً على تصميم سيرتك الذاتية بوضوح واستخدام كلمات مفتاحية قوية تعكس كفاءتك المهنية لتلفت انتباه مسؤولي التوظيف.`;
        }

        return res.status(200).json({ reply: replyText });

    } catch (error) {
        return res.status(500).json({ reply: 'حدث خطأ داخلي في الخادم.' });
    }
}
