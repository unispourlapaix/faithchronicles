const fs = require('fs');
const path = require('path');

const translations = {
  fr: {
    resetPasswordTitle: "Réinitialiser le mot de passe",
    resetPasswordSubtitle: "Entrez votre email pour recevoir un lien de réinitialisation",
    sendResetLink: "Envoyer le lien",
    resetEmailSent: "📧 Email de réinitialisation envoyé ! Vérifiez votre boîte mail.",
    errorReset: "Erreur lors de l'envoi de l'email",
    backToSignin: "Retour à la connexion"
  },
  en: {
    resetPasswordTitle: "Reset Password",
    resetPasswordSubtitle: "Enter your email to receive a reset link",
    sendResetLink: "Send Reset Link",
    resetEmailSent: "📧 Reset email sent! Check your inbox.",
    errorReset: "Error sending reset email",
    backToSignin: "Back to Sign In"
  },
  es: {
    resetPasswordTitle: "Restablecer Contraseña",
    resetPasswordSubtitle: "Ingresa tu correo para recibir un enlace de restablecimiento",
    sendResetLink: "Enviar Enlace",
    resetEmailSent: "📧 ¡Correo de restablecimiento enviado! Revisa tu bandeja de entrada.",
    errorReset: "Error al enviar el correo",
    backToSignin: "Volver a Iniciar Sesión"
  },
  de: {
    resetPasswordTitle: "Passwort Zurücksetzen",
    resetPasswordSubtitle: "Geben Sie Ihre E-Mail ein, um einen Zurücksetzungslink zu erhalten",
    sendResetLink: "Link Senden",
    resetEmailSent: "📧 Zurücksetzungs-E-Mail gesendet! Überprüfen Sie Ihr Postfach.",
    errorReset: "Fehler beim Senden der E-Mail",
    backToSignin: "Zurück zur Anmeldung"
  },
  it: {
    resetPasswordTitle: "Reimposta Password",
    resetPasswordSubtitle: "Inserisci la tua email per ricevere un link di reimpostazione",
    sendResetLink: "Invia Link",
    resetEmailSent: "📧 Email di reimpostazione inviata! Controlla la tua casella di posta.",
    errorReset: "Errore nell'invio dell'email",
    backToSignin: "Torna al Login"
  },
  pt: {
    resetPasswordTitle: "Redefinir Senha",
    resetPasswordSubtitle: "Digite seu email para receber um link de redefinição",
    sendResetLink: "Enviar Link",
    resetEmailSent: "📧 Email de redefinição enviado! Verifique sua caixa de entrada.",
    errorReset: "Erro ao enviar o email",
    backToSignin: "Voltar ao Login"
  },
  ru: {
    resetPasswordTitle: "Сброс Пароля",
    resetPasswordSubtitle: "Введите email для получения ссылки сброса",
    sendResetLink: "Отправить Ссылку",
    resetEmailSent: "📧 Письмо для сброса отправлено! Проверьте почту.",
    errorReset: "Ошибка отправки письма",
    backToSignin: "Назад ко входу"
  },
  uk: {
    resetPasswordTitle: "Скинути Пароль",
    resetPasswordSubtitle: "Введіть email для отримання посилання скидання",
    sendResetLink: "Надіслати Посилання",
    resetEmailSent: "📧 Лист для скидання надіслано! Перевірте пошту.",
    errorReset: "Помилка надсилання листа",
    backToSignin: "Назад до входу"
  },
  zh: {
    resetPasswordTitle: "重置密码",
    resetPasswordSubtitle: "输入您的电子邮件以接收重置链接",
    sendResetLink: "发送链接",
    resetEmailSent: "📧 重置邮件已发送！请检查您的收件箱。",
    errorReset: "发送邮件时出错",
    backToSignin: "返回登录"
  },
  ar: {
    resetPasswordTitle: "إعادة تعيين كلمة المرور",
    resetPasswordSubtitle: "أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين",
    sendResetLink: "إرسال الرابط",
    resetEmailSent: "📧 تم إرسال بريد إعادة التعيين! تحقق من بريدك الوارد.",
    errorReset: "خطأ في إرسال البريد الإلكتروني",
    backToSignin: "العودة إلى تسجيل الدخول"
  },
  he: {
    resetPasswordTitle: "איפוס סיסמה",
    resetPasswordSubtitle: "הזן את האימייל שלך כדי לקבל קישור לאיפוס",
    sendResetLink: "שלח קישור",
    resetEmailSent: "📧 נשלח מייל איפוס! בדוק את תיבת הדואר שלך.",
    errorReset: "שגיאה בשליחת המייל",
    backToSignin: "חזרה להתחברות"
  },
  jp: {
    resetPasswordTitle: "パスワードリセット",
    resetPasswordSubtitle: "リセットリンクを受け取るためにメールアドレスを入力してください",
    sendResetLink: "リンクを送信",
    resetEmailSent: "📧 リセットメールを送信しました！受信トレイを確認してください。",
    errorReset: "メール送信エラー",
    backToSignin: "ログインに戻る"
  },
  ko: {
    resetPasswordTitle: "비밀번호 재설정",
    resetPasswordSubtitle: "재설정 링크를 받으려면 이메일을 입력하세요",
    sendResetLink: "링크 보내기",
    resetEmailSent: "📧 재설정 이메일이 전송되었습니다! 받은편지함을 확인하세요.",
    errorReset: "이메일 전송 오류",
    backToSignin: "로그인으로 돌아가기"
  },
  hi: {
    resetPasswordTitle: "पासवर्ड रीसेट करें",
    resetPasswordSubtitle: "रीसेट लिंक प्राप्त करने के लिए अपना ईमेल दर्ज करें",
    sendResetLink: "लिंक भेजें",
    resetEmailSent: "📧 रीसेट ईमेल भेजा गया! अपना इनबॉक्स जांचें।",
    errorReset: "ईमेल भेजने में त्रुटि",
    backToSignin: "साइन इन पर वापस जाएं"
  },
  sw: {
    resetPasswordTitle: "Weka Upya Nenosiri",
    resetPasswordSubtitle: "Ingiza barua pepe yako kupokea kiungo cha kuweka upya",
    sendResetLink: "Tuma Kiungo",
    resetEmailSent: "📧 Barua pepe ya kuweka upya imetumwa! Angalia sanduku lako la barua.",
    errorReset: "Hitilafu ya kutuma barua pepe",
    backToSignin: "Rudi kwenye Kuingia"
  },
  pl: {
    resetPasswordTitle: "Zresetuj Hasło",
    resetPasswordSubtitle: "Wprowadź swój email, aby otrzymać link resetujący",
    sendResetLink: "Wyślij Link",
    resetEmailSent: "📧 Email resetujący wysłany! Sprawdź swoją skrzynkę.",
    errorReset: "Błąd wysyłania emaila",
    backToSignin: "Powrót do logowania"
  },
  rc: {
    resetPasswordTitle: "Réinitialiser le mot de passe",
    resetPasswordSubtitle: "Entrez votre email pour recevoir un lien de réinitialisation",
    sendResetLink: "Envoyer le lien",
    resetEmailSent: "📧 Email de réinitialisation envoyé ! Vérifiez votre boîte mail.",
    errorReset: "Erreur lors de l'envoi de l'email",
    backToSignin: "Retour à la connexion"
  }
};

const translationDir = path.join(__dirname, '..', 'src', 'data', 'translations');

Object.entries(translations).forEach(([lang, strings]) => {
  const filePath = path.join(translationDir, lang, 'ui.js');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Fichier manquant: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Vérifier si déjà ajouté
  if (content.includes('resetPasswordTitle')) {
    console.log(`✅ ${lang}: Déjà ajouté`);
    return;
  }

  // Chercher la ligne forgotPassword et ajouter après
  const searchPattern = /forgotPassword: ".*",/;
  
  if (!content.match(searchPattern)) {
    console.log(`⚠️ Pattern forgotPassword non trouvé dans ${lang}`);
    return;
  }

  // Ajouter les nouvelles lignes après forgotPassword
  content = content.replace(
    searchPattern,
    (match) => `${match}\n    resetPasswordTitle: "${strings.resetPasswordTitle}",\n    resetPasswordSubtitle: "${strings.resetPasswordSubtitle}",\n    sendResetLink: "${strings.sendResetLink}",\n    resetEmailSent: "${strings.resetEmailSent}",\n    errorReset: "${strings.errorReset}",\n    backToSignin: "${strings.backToSignin}",`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${lang}: Traductions ajoutées`);
});

console.log('\n✨ Terminé !');
