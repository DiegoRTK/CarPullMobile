import React, {useState} from 'react';
import {View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

// Configura el idioma del calendario
LocaleConfig.locales.es = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'es';

interface ScheduleCalendarProps {
  selectedDates: SelectedDates;
  onDayPress: (day: string) => void;
}

export interface SelectedDates {
  [date: string]: {
    marked: boolean;
    selected?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  selectedDates,
  onDayPress,
}) => {
  return (
    <View>
      <Calendar
        markedDates={selectedDates}
        onDayPress={day => onDayPress(day.dateString)}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'blue',
          arrowColor: 'blue',
        }}
      />
    </View>
  );
};

export default ScheduleCalendar;
