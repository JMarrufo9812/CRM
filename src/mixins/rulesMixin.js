const isRequiredObject = (v, m = 'Este campo') => {
  const valueUnreactive = v ? JSON.parse(JSON.stringify(v)) : {};
  const isValidA = !!valueUnreactive;
  const isValidB = isValidA ? Object.keys(valueUnreactive).length !== 0 : false;
  return (isValidA && isValidB) || `${m} es requerido`;
};
const isRequired = (v, m = 'Este campo') => !!v?.trim() || `${m} es requerido`;
const isRequiredSelect = (v) => !!v || 'Selecciona una opcion';
const isRequiredBoolean = (v) => {
  if (v === undefined) {
    return 'Seleccione una opcion';
  }
  return true;
};
const eqSize = (v, n) =>
  (v && v.toString().length === n) || `El número debe de ser de ${n} dígitos`;

const validEmail = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regexEmail.test(email);
};

const validListEmails = (list) => {
  if (list.length > 0) {
    return list.every((item) => {
      if (item.email) {
        return validEmail(item.email);
      }
      return validEmail(item);
    });
  }
  return true;
};
const isRequiredOne = (v, m = 'Este campo') =>
  v.length > 0 || `${m} es requerido`;

const patterns = {
  pass: (v) =>
    new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d/\\()=<>@$¡!%*#¿?&._-·"'*+`^{};:[\]ñÑ]{8,}$/g,
    ).test(v) || 'Al menos 8 carácteres. Combina letras y números.',
  phone: (v) => new RegExp(/^[0-9]+$/).test(v) || 'Teléfono inválido',
  atLeast: (v) =>
    new RegExp(/[A-Z a-z]+/).test(v) || 'Debes escribir al menos una letra.',
  noNumbers: (v) =>
    new RegExp(/^([^0-9]*)$/g).test(v) || 'No debes escribir números.',
  noSpaces: (v) =>
    new RegExp(/^[a-zA-Z0-9_]*$/).test(v) ||
    'No se permiten espacios en blanco',
  postalCode: (v) =>
    new RegExp(/^\d{5}$/g).test(v) || 'Ingresa un código postal válido.',
  noValidChars: (v) =>
    new RegExp(/^[^`~¡!ºª@"·#$%^&*()_+={}[\]|\\:;“’<,>¿?๐฿¢¬÷\-ç¨´']*$/g).test(
      v,
    ) || 'Carácteres no válidos.',
  noValidCharsCustom: (v) => {
    const regex = /^[^`~¡!ºª@"·$%^&*()_+={}[\]|\\:;“’<>¿?๐฿¢¬÷ç¨´]*$/g;
    return new RegExp(regex).test(v) || 'Carácteres no válidos.';
  },
  website: (v) =>
    new RegExp(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/gi,
    ).test(v) || 'Sitio web inválido.',
  email: (v) =>
    !v ||
    new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(v) ||
    'Por favor ingresa un email válido.',
  emails: (v) => validListEmails(v) || 'Selecciona o escribe un email valido',
  facebook: (v) =>
    new RegExp(/http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/).test(
      v,
    ) || 'Dirección de facebook inválida',
  twitter: (v) =>
    new RegExp(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/).test(
      v,
    ) || 'Dirección twitter inválida',
  instagram: (v) =>
    new RegExp(/http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/).test(
      v,
    ) || 'Dirección instagram inválida',
  linkedin: (v) =>
    new RegExp(/http(?:s)?:\/\/(?:www\.)?linkedin\.com\/([a-zA-Z0-9_]+)/).test(
      v,
    ) || 'Dirección linkedin inválida',
};

export const rulesMixin = {
  data() {
    return {
      rules: {
        selectBoolean: [(v) => isRequiredBoolean(v)],
        isRequired: [(v) => isRequired(v)],
        isRequiredOne: [(v) => isRequiredOne(v)],
        select: [(v) => isRequiredSelect(v)],
        isRequiredObject: [(v) => isRequiredObject(v)],
        general: [
          (v) => isRequired(v?.trim()),
          (v) => patterns.noValidChars(v),
          (v) => patterns.atLeast(v),
        ],
        text: [(v) => patterns.noNumbers(v)],
        password: [(v) => isRequired(v), (v) => patterns.pass(v)],
        autoComplete: [(v) => v.length > 0 || 'Selecciona una opción'],
        codePostalMX: [(v) => isRequired(v), (v) => patterns.postalCode(v)],
        codePostal: [(v) => isRequired(v), (v) => patterns.noValidChars(v)],
        address: [
          (v) => isRequired(v),
          (v) => patterns.noValidCharsCustom(v, ['#']),
          (v) => patterns.atLeast(v),
        ],
        website: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.website(v);
          },
        ],
        email: [(v) => patterns.email(v)],
        emailRequired: [(v) => isRequired(v), (v) => patterns.email(v)],
        phoneNumber: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.phone(v);
          },
          (v) => {
            if (!v) {
              return true;
            }
            return eqSize(v, 10);
          },
        ],
        emailsCombobox: [(v) => patterns.emails(v)],
        // ******************************************social medias************************************************
        facebook: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.facebook(v);
          },
        ],
        twitter: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.twitter(v);
          },
        ],
        instagram: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.instagram(v);
          },
        ],
        linkedin: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.linkedin(v);
          },
        ],
        other: [
          (v) => {
            if (!v) {
              return true;
            }
            return patterns.website(v);
          },
        ],
      },
    };
  },
};
