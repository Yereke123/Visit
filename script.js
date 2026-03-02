const userData = {
  "firstName": "Жалгас", 
  "lastName": "Жексенбаев", // Ваша фамилия
  "company": "ORLIK",
  "jobTitle": "ЖАРНАМА АГЕНТТІГІ",
  "phone": "+77019328506", // Ваш WhatsApp номер
  "email": "kaz_designer@list.ru" // Ваш Email
};

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Кнопка WhatsApp
  const btnWa = document.getElementById("btnWhatsapp");
  const waNumber = userData.phone.replace(/[^0-9]/g, '');
  btnWa.href = `https://wa.me/${waNumber}`;

  // 2. УМНАЯ КНОПКА EMAIL (Проверка: Телефон -> приложение, ПК -> Gmail)
  const btnEmail = document.getElementById("btnEmail");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // ДЛЯ ТЕЛЕФОНОВ: Открываем стандартное приложение почты
    btnEmail.href = `mailto:${userData.email}`;
    btnEmail.target = "_self";
  } else {
    // ДЛЯ КОМПЬЮТЕРОВ: Открываем веб-интерфейс Gmail в новой вкладке
    btnEmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${userData.email}`;
    btnEmail.target = "_blank";
  }

  // 3. Кнопка сохранения контакта VCF
  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", function(e) {
    e.preventDefault();
    
    const fullName = `${userData.firstName} ${userData.lastName}`;
    
    const vcardData = `BEGIN:VCARD
VERSION:3.0
N:${userData.lastName};${userData.firstName};;;
FN:${fullName}
ORG:${userData.company}
TITLE:${userData.jobTitle}
TEL;TYPE=CELL,VOICE:${userData.phone}
EMAIL;TYPE=WORK,INTERNET:${userData.email}
END:VCARD`;

    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fullName}.vcf`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
