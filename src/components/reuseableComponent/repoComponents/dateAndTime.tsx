import { DateConvert } from "./clientAndSuper/responseIndividual";

export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
     
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

