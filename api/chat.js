export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        const text = message ? message.toLowerCase() : "";

        let replyText = "";

        // محرك ذكاء اصطناعي محلي مجاني ومدمج بالخادم
        if (text.includes('ملخص') || text.includes('summary')) {
            replyText = "الملخص المهني يجب أن يكون في 3-4 أسطر ويوضح خبرتك وقيمتك للشركة. هل تريدني أن أعطيك قالباً جاهزاً لتخصص معين (مثل: مبرمج، محاسب، إداري)؟";
        } 
        else if (text.includes('مبرمج') || text.includes('تقني') || text.includes('برمجة')) {
            replyText = "تفضل هذا الملخص الجاهز للمبرمجين:\n\n'مهندس برمجيات ومطور واجهات ذو خبرة تزيد عن 3 سنوات في بناء التطبيقات وتصميم الأنظمة باستخدام أحدث التقنيات. أمتلك سجلاً حافلاً في تحسين الأداء وحل المشكلات البرمجية المعقدة.'\n\nقم بنسخه وتعديله بما يناسبك!";
        }
        else if (text.includes('ats') || text.includes('أنظمة')) {
            replyText = "أنظمة الـ ATS تعتمد على الكلمات المفتاحية البسيطة. تجنب الجداول المعقدة، الصور، أو الأعمدة الجانبية، واستخدم الخطوط القياسية واحرص على تطابق كلمات الوظيفة مع سيرتك الذاتية.";
        }
        else if (text.includes('مهارات') || text.includes('skills')) {
            replyText = "اقسم مهاراتك إلى قسمين: مهارات تقنية (Hard Skills) مثل اللغات والأدوات، ومهارات شخصية (Soft Skills) مثل العمل الجماعي وحل المشكلات.";
        }
        else if (text.includes('مرحبا') || text.includes('هلا') || text.includes('السلام')) {
            replyText = "أهلاً بك! أنا مساعدك الذكي المجاني لإنشاء سير ذاتية تنافسية ومتوافقة مع الـ ATS. كيف يمكنني مساعدتك اليوم؟";
        }
        else {
            replyText = "سؤال ممتاز! لتعزيز سيرتك الذاتية، احرص دائماً على كتابة الإنجازات بلغة الأرقام (مثل: إنجاز المشاريع قبل الموعد بنسبة 15%) بدلاً من سرد المهام الروتينية.";
        }

        return res.status(200).json({ reply: replyText });

    } catch (error) {
        return res.status(500).json({ reply: 'حدث خطأ داخلي في الخادم.' });
    }
}
