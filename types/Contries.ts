
export interface Country {
    name: {
      common: string;
      official: string;
      nativeName: Record<string, { official: string; common: string }>;
    };
    cca2: string;
    region: string;
    subregion: string;
    translations: Record<string, { official: string; common: string }>;
  }
  
  export interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
    regions: string[];
  }