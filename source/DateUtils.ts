// -----------------------------------------------------------------------------
export class DateUtils
{
  static NowInUnixSeconds() { return Math.trunc(Date.now() / 1000); }
}

// -----------------------------------------------------------------------------
export default DateUtils;
