const fs = require('fs');
const path = require('path');

const translations = {
  fr: {
    newPassword: "Nouveau mot de passe",
    enterNewPassword: "Choisissez un nouveau mot de passe sécurisé",
    confirmPassword: "Confirmer le mot de passe",
    updatePassword: "Mettre à jour le mot de passe",
    passwordsDontMatch: "Les mots de passe ne correspondent pas",
    passwordUpdateSuccess: "✅ Mot de passe mis à jour avec succès !",
    errorUpdatePassword: "Erreur lors de la mise à jour du mot de passe",
    resetLinkExpired: "Lien de réinitialisation expiré ou invalide"
  },
  en: {
    newPassword: "New Password",
    enterNewPassword: "Choose a new secure password",
    confirmPassword: "Confirm Password",
    updatePassword: "Update Password",
    passwordsDontMatch: "Passwords don't match",
    passwordUpdateSuccess: "✅ Password updated successfully!",
    errorUpdatePassword: "Error updating password",
    resetLinkExpired: "Reset link expired or invalid"
  },
  es: {
    newPassword: "Nueva Contraseña",
    enterNewPassword: "Elige una nueva contraseña segura",
    confirmPassword: "Confirmar Contraseña",
    updatePassword: "Actualizar Contraseña",
    passwordsDontMatch: "Las contraseñas no coinciden",
    passwordUpdateSuccess: "✅ ¡Contraseña actualizada con éxito!",
    errorUpdatePassword: "Error al actualizar la contraseña",
    resetLinkExpired: "Enlace de restablecimiento caducado o inválido"
  },
  de: {
    newPassword: "Neues Passwort",
    enterNewPassword: "Wählen Sie ein neues sicheres Passwort",
    confirmPassword: "Passwort Bestätigen",
    updatePassword: "Passwort Aktualisieren",
    passwordsDontMatch: "Passwörter stimmen nicht überein",
    passwordUpdateSuccess: "✅ Passwort erfolgreich aktualisiert!",
    errorUpdatePassword: "Fehler beim Aktualisieren des Passworts",
    resetLinkExpired: "Zurücksetzungslink abgelaufen oder ungültig"
  },
  it: {
    newPassword: "Nuova Password",
    enterNewPassword: "Scegli una nuova password sicura",
    confirmPassword: "Conferma Password",
    updatePassword: "Aggiorna Password",
    passwordsDontMatch: "Le password non corrispondono",
    passwordUpdateSuccess: "✅ Password aggiornata con successo!",
    errorUpdatePassword: "Errore nell'aggiornamento della password",
    resetLinkExpired: "Link di reimpostazione scaduto o non valido"
  },
  pt: {
    newPassword: "Nova Senha",
    enterNewPassword: "Escolha uma nova senha segura",
    confirmPassword: "Confirmar Senha",
    updatePassword: "Atualizar Senha",
    passwordsDontMatch: "As senhas não correspondem",
    passwordUpdateSuccess: "✅ Senha atualizada com sucesso!",
    errorUpdatePassword: "Erro ao atualizar a senha",
    resetLinkExpired: "Link de redefinição expirado ou inválido"
  },
  ru: {
    newPassword: "Новый Пароль",
    enterNewPassword: "Выберите новый безопасный пароль",
    confirmPassword: "Подтвердите Пароль",
    updatePassword: "Обновить Пароль",
    passwordsDontMatch: "Пароли не совпадают",
    passwordUpdateSuccess: "✅ Пароль успешно обновлён!",
    errorUpdatePassword: "Ошибка обновления пароля",
    resetLinkExpired: "Ссылка сброса истекла или недействительна"
  },
  uk: {
    newPassword: "Новий Пароль",
    enterNewPassword: "Оберіть новий безпечний пароль",
    confirmPassword: "Підтвердіть Пароль",
    updatePassword: "Оновити Пароль",
    passwordsDontMatch: "Паролі не збігаються",
    passwordUpdateSuccess: "✅ Пароль успішно оновлено!",
    errorUpdatePassword: "Помилка оновлення пароля",
    resetLinkExpired: "Посилання скидання минуло або недійсне"
  },
  zh: {
    newPassword: "新密码",
    enterNewPassword: "选择一个新的安全密码",
    confirmPassword: "确认密码",
    updatePassword: "更新密码",
    passwordsDontMatch: "密码不匹配",
    passwordUpdateSuccess: "✅ 密码更新成功！",
    errorUpdatePassword: "更新密码时出错",
    resetLinkExpired: "重置链接已过期或无效"
  },
  ar: {
    newPassword: "كلمة مرور جديدة",
    enterNewPassword: "اختر كلمة مرور آمنة جديدة",
    confirmPassword: "تأكيد كلمة المرور",
    updatePassword: "تحديث كلمة المرور",
    passwordsDontMatch: "كلمات المرور غير متطابقة",
    passwordUpdateSuccess: "✅ تم تحديث كلمة المرور بنجاح!",
    errorUpdatePassword: "خطأ في تحديث كلمة المرور",
    resetLinkExpired: "انتهت صلاحية رابط إعادة التعيين أو غير صالح"
  },
  he: {
    newPassword: "סיסמה חדשה",
    enterNewPassword: "בחר סיסמה חדשה מאובטחת",
    confirmPassword: "אשר סיסמה",
    updatePassword: "עדכן סיסמה",
    passwordsDontMatch: "הסיסמאות אינן תואמות",
    passwordUpdateSuccess: "✅ הסיסמה עודכנה בהצלחה!",
    errorUpdatePassword: "שגיאה בעדכון הסיסמה",
    resetLinkExpired: "קישור האיפוס פג תוקף או לא תקף"
  },
  jp: {
    newPassword: "新しいパスワード",
    enterNewPassword: "新しい安全なパスワードを選択してください",
    confirmPassword: "パスワードを確認",
    updatePassword: "パスワードを更新",
    passwordsDontMatch: "パスワードが一致しません",
    passwordUpdateSuccess: "✅ パスワードが正常に更新されました！",
    errorUpdatePassword: "パスワードの更新中にエラーが発生しました",
    resetLinkExpired: "リセットリンクが期限切れまたは無効です"
  },
  ko: {
    newPassword: "새 비밀번호",
    enterNewPassword: "새로운 안전한 비밀번호를 선택하세요",
    confirmPassword: "비밀번호 확인",
    updatePassword: "비밀번호 업데이트",
    passwordsDontMatch: "비밀번호가 일치하지 않습니다",
    passwordUpdateSuccess: "✅ 비밀번호가 성공적으로 업데이트되었습니다!",
    errorUpdatePassword: "비밀번호 업데이트 중 오류 발생",
    resetLinkExpired: "재설정 링크가 만료되었거나 유효하지 않습니다"
  },
  hi: {
    newPassword: "नया पासवर्ड",
    enterNewPassword: "एक नया सुरक्षित पासवर्ड चुनें",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    updatePassword: "पासवर्ड अपडेट करें",
    passwordsDontMatch: "पासवर्ड मेल नहीं खाते",
    passwordUpdateSuccess: "✅ पासवर्ड सफलतापूर्वक अपडेट किया गया!",
    errorUpdatePassword: "पासवर्ड अपडेट करते समय त्रुटि",
    resetLinkExpired: "रीसेट लिंक समाप्त हो गया या अमान्य है"
  },
  sw: {
    newPassword: "Nenosiri Jipya",
    enterNewPassword: "Chagua nenosiri jipya salama",
    confirmPassword: "Thibitisha Nenosiri",
    updatePassword: "Sasisha Nenosiri",
    passwordsDontMatch: "Nenosiri hazilingani",
    passwordUpdateSuccess: "✅ Nenosiri limesasishwa kwa mafanikio!",
    errorUpdatePassword: "Hitilafu ya kusasisha nenosiri",
    resetLinkExpired: "Kiungo cha kuweka upya kimeisha muda au si sahihi"
  },
  pl: {
    newPassword: "Nowe Hasło",
    enterNewPassword: "Wybierz nowe bezpieczne hasło",
    confirmPassword: "Potwierdź Hasło",
    updatePassword: "Zaktualizuj Hasło",
    passwordsDontMatch: "Hasła się nie zgadzają",
    passwordUpdateSuccess: "✅ Hasło zostało pomyślnie zaktualizowane!",
    errorUpdatePassword: "Błąd aktualizacji hasła",
    resetLinkExpired: "Link resetujący wygasł lub jest nieprawidłowy"
  },
  rc: {
    newPassword: "Nouveau mot de passe",
    enterNewPassword: "Choisissez un nouveau mot de passe sécurisé",
    confirmPassword: "Confirmer le mot de passe",
    updatePassword: "Mettre à jour le mot de passe",
    passwordsDontMatch: "Les mots de passe ne correspondent pas",
    passwordUpdateSuccess: "✅ Mot de passe mis à jour avec succès !",
    errorUpdatePassword: "Erreur lors de la mise à jour du mot de passe",
    resetLinkExpired: "Lien de réinitialisation expiré ou invalide"
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
  if (content.includes('newPassword')) {
    console.log(`✅ ${lang}: Déjà ajouté`);
    return;
  }

  // Chercher la ligne backToSignin et ajouter après
  const searchPattern = /backToSignin: ".*",/;
  
  if (!content.match(searchPattern)) {
    console.log(`⚠️ Pattern backToSignin non trouvé dans ${lang}`);
    return;
  }

  // Ajouter les nouvelles lignes après backToSignin
  content = content.replace(
    searchPattern,
    (match) => `${match}\n    newPassword: "${strings.newPassword}",\n    enterNewPassword: "${strings.enterNewPassword}",\n    confirmPassword: "${strings.confirmPassword}",\n    updatePassword: "${strings.updatePassword}",\n    passwordsDontMatch: "${strings.passwordsDontMatch}",\n    passwordUpdateSuccess: "${strings.passwordUpdateSuccess}",\n    errorUpdatePassword: "${strings.errorUpdatePassword}",\n    resetLinkExpired: "${strings.resetLinkExpired}",`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${lang}: Traductions ajoutées`);
});

console.log('\n✨ Terminé !');
