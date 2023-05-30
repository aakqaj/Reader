export interface Them {
  name: string;
  BackgroundColor: string;
  FontColor: string;
}

export interface BookStyle {
  Font: {
    TitleFontFamily?: string;
    ContentFontFamily?: string;
    TitleSize: number;
    ContentSize: number;
  };
  Them: Them;
}
