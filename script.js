const userData = {
  "firstName": "Жалгас", 
  "lastName": "Жексенбаев",
  "fullName": "Жалгас Жексембаев Жексенбекулы", // Полное имя для отображения
  "company": "ORLIK",
  "jobTitle": "ЖАРНАМА АГЕНТТІГІ",
  "phone": "+77019328506",
  "email": "kaz_designer@list.ru"
};

document.addEventListener("DOMContentLoaded", () => {
  
  // АВТОМАТИЧЕСКОЕ ЗАПОЛНЕНИЕ ТЕКСТА НА СТРАНИЦЕ
  document.getElementById("personName").textContent = userData.fullName;
  document.getElementById("userName").textContent = userData.company;
  document.getElementById("userJob").textContent = userData.jobTitle;

  // 1. Кнопка WhatsApp
  const btnWa = document.getElementById("btnWhatsapp");
  const waNumber = userData.phone.replace(/[^0-9]/g, '');
  btnWa.href = `https://wa.me/${waNumber}`;

  // 2. Умная кнопка Email
  const btnEmail = document.getElementById("btnEmail");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    btnEmail.href = `mailto:${userData.email}`;
  } else {
    btnEmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${userData.email}`;
    btnEmail.target = "_blank";
  }

  // 3. Сохранение контакта (исправленный формат)
  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", function(e) {
    e.preventDefault();
    
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${userData.fullName}
N:${userData.lastName};${userData.firstName};;;
ORG:${userData.company}
TITLE:${userData.jobTitle}
TEL;TYPE=CELL,VOICE:${userData.phone}
EMAIL;TYPE=WORK,INTERNET:${userData.email}
END:VCARD`;

    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${userData.firstName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});
