import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonthView } from '../../models/views/moth-view';
import { DayInfo } from '../../models/day-info';
import { DayClasses } from '../../models/day-classes';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss']
})
export class MonthCalendarComponent {
  /**
   * Event raised when the user selects a date.
   */
  @Output('change') change = new EventEmitter<Date>();

  /**
   * Event raised when the user clicks the calendar.
   */
  @Output('monthClick') monthClick = new EventEmitter<MonthCalendarComponent>();

  /**
   * Date to show.
   */
  private _date = new Date();

  get date(): Date {
    return this._date;
  }

  @Input() set date(date: Date) {
    this._date = date;
    this.view = (new MonthView(this._date)).createView();
  }

  /**
   * CSS classes for different days inside the month.
   */
  @Input() dayClasses: DayClasses = {};

  /**
   * CSS class for the current day.
   */
  @Input() currentDayClass = 'day--today';

  /**
   * CSS class for the selected day.
   */
  @Input() selectedDayClass = 'day--selected';

  /**
   * View of the current month.
   */
  view = (new MonthView(this._date)).createView();

  /**
   * Gets the CSS class applicable to
   * the specified day.
   * @param day Day.
   */
  getClassForDay(day: DayInfo): string {
    if (day) {

      if (day.day === this._date.getDate()) {
        return this.selectedDayClass;
      }

      if (day.isToday) {
        return this.currentDayClass;
      }

      return this.dayClasses[day.day] || '';

    } else {
      return '';
    }
  }

  /**
   * Controls the click event of a day cell.
   * @param dayInfo Info about the selected day.
   */
  onDayClick(dayInfo: DayInfo): void {
    if (dayInfo) {
      const selectedDate = new Date(this.date.valueOf());
      selectedDate.setDate(dayInfo.day);

      this.date = new Date(selectedDate.valueOf());

      this.change.emit(selectedDate);
    }
  }

  /**
   * Controls the click event of the month.
   */
  onMonthClick(): void {
    this.monthClick.emit(this);
  }

}
