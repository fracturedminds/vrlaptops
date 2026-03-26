export const getWhatsappUrl = (laptopName: string) => {
    const message = `I'm interested in ${laptopName}`;
    return `https://api.whatsapp.com/send?phone=916300761707&text=${message}`;

  };

  export const getPhoneCallUrl = () => {
    const phoneNumber = "6300761707"; // your global number
    return `tel:${phoneNumber}`;
  };