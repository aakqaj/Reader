interface FontFamily {
  name: string;
  url: string;
}

interface Them {
  name: string;
  BackgroundColor: string;
  FontColor: string;
}

export interface BookStyle {
  Font: {
    FontFamily?: FontFamily[];
    TitleSize: number;
    ContentSize: number;
  };
  Thems: Them[];
}
