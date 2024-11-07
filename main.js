import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const RentalScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  
  // Generate calendar dates for current month
  const generateCalendarDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(new Date(year, month, i));
    }
    
    return dates;
  };

  // Generate available time slots (9 AM to 5 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowTimeSelect(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Booking confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}`);
      setSelectedDate(null);
      setSelectedTime(null);
      setShowTimeSelect(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Rental Scheduler
        </CardTitle>
        <CardDescription>
          Select a date and time for your rental
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold p-2">
              {day}
            </div>
          ))}
          {generateCalendarDates().map((date, index) => (
            <Button
              key={index}
              variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
              className="p-2 h-16"
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </Button>
          ))}
        </div>

        {showTimeSelect && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                {selectedTime ? `Selected: ${selectedTime}` : 'Select Time'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select a Time</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2">
                {generateTimeSlots().map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={handleBooking}
                disabled={!selectedTime}
                className="mt-4"
              >
                Confirm Booking
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default RentalScheduler;