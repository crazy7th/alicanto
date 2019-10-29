export const provider = [
  {
    name: "XL",
    logo: "https://d1ffqr687y72wp.cloudfront.net/s3fs-public/xl-200-wide.png",
    prefix: ["0817", "0818", "0819", "0859", "0877", "0878", "0879"]
  },
  {
    name: "Telkomsel",
    logo:
      "https://d1ffqr687y72wp.cloudfront.net/s3fs-public/09_telkomsel_0.png",
    prefix: [
      "0811",
      "0812",
      "0813",
      "0821",
      "0822",
      "0823",
      "0851",
      "0852",
      "0853"
    ]
  },
  {
    name: "Axis",
    logo: "https://d1ffqr687y72wp.cloudfront.net/s3fs-public/07_axis.png",
    prefix: ["0831", "0832", "0838", "08591", "08598"]
  },
  {
    name: "Indosat",
    logo: "https://d1ffqr687y72wp.cloudfront.net/s3fs-public/01_indosat_1.png",
    prefix: ["0814", "0815", "0816", "0855", "0856", "0857", "0858"]
  },
  {
    name: "Tri",
    logo: "https://d1ffqr687y72wp.cloudfront.net/s3fs-public/04_three_0.png",
    prefix: ["0895", "0896", "0897", "0898", "0899"]
  },
  {
    name: "Smartfren",
    logo: "/static/transaction/smartfren.jpeg",
    prefix: [
      "0881",
      "0882",
      "0883",
      "0884",
      "0885",
      "0886",
      "0887",
      "0888",
      "0889"
    ]
  }
];

export const phoneOperator = (phone_number, mProvider = provider) => {
  const prefix_nohp = phone_number.substring(0, 4);
  let operator = mProvider.find(item => {
    if (item.prefix.includes(prefix_nohp)) {
      return item;
    } else {
      return false;
    }
  });
  return operator;
};
