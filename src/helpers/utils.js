// ORDENA PARAMETROS
export const UTIL_ORDER = ({
  // ARRAY DE ELEMENTOS
  listItems = [],
  // ACENDENTE O DECENDENTE
  orderBy = 'ASC',
  // SI VAS A COMPARARTE DENTRO DE LA PROPIEDAD DE UN OBJETO O NO
  nextElement = 'none',
}) => {
  // RECIBE LOS ELEMENTOS A COMPARAR EL ANTERIOR Y EL SERGUIENTE
  return listItems.sort((elementBefore, elementAfter) => {
    // ORDENAMIENTO ASCENDENTE
    const orderedElementsASC =
      nextElement === 'none'
        ? elementBefore - elementAfter
        : elementBefore[nextElement] - elementAfter[nextElement];
    // ORDENAMIENTO DESCENDENTE
    const orderedElementsDESC =
      nextElement === 'none'
        ? elementAfter - elementBefore
        : elementAfter[nextElement] - elementBefore[nextElement];
    // VALIDA QUE TIPO DE ORDENAMIENTO RETORNARA
    return orderBy === 'ASC' ? orderedElementsASC : orderedElementsDESC;
  });
};

// Receive a date with format 01/12/2020 11:23 and convert to a Date Object
export const UTIL_FORMAT_DATE = (itemDate) => {
  // Divide 01/12/2020 and 11:23
  const [dateCreated, timeCreated] = itemDate.split(' ');
  // Divide date on year 2020, month 12, day 01
  const [year, month, day] = dateCreated.split('/');
  // Divide time on hour 11 and minute 23
  const [hour, minute] = timeCreated.split(':');
  // Return a new Date Object
  const newDate = new Date(year, month, day, hour, minute);
  return newDate;
};

export const UTIL_ORDER_DATE = ({
  // ARRAY DE ELEMENTOS
  listItems = [],
  // ACENDENTE O DECENDENTE
  orderBy = 'ASC',
  // SI VAS A COMPARARTE DENTRO DE LA PROPIEDAD DE UN OBJETO O NO
  nextElement = 'none',
}) => {
  // RECIBE LOS ELEMENTOS A COMPARAR EL ANTERIOR Y EL SERGUIENTE
  return listItems.sort((elementBefore, elementAfter) => {
    const formatElementBefore = UTIL_FORMAT_DATE(elementBefore[nextElement]);
    const formatElementAfter = UTIL_FORMAT_DATE(elementAfter[nextElement]);
    // ORDENAMIENTO ASCENDENTE
    switch (orderBy) {
      case 'ASC':
        return formatElementAfter - formatElementBefore;

      case 'DESC':
        return formatElementBefore - formatElementAfter;

      default:
        return formatElementAfter - formatElementBefore;
    }
  });
};
