enum Timespan {
    Week: 1/4,
    Month: 1,
    Quarter: 3,
    Year: 52,
}

type StandardTime = number;

const ConvertTimeToStandardTime = (val: number, span: Timespan): StandardTime => val * span

const ConvertStandardTimeToTime = (val: StandardTime, span: Timespan): number => val / span


