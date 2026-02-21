"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, Clock, Globe, MapPin, Check, Sun, Moon, Calendar, ArrowLeft, UserPlus, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Image from "next/image";
import "react-phone-number-input/style.css";

type Step = 'calendar' | 'form' | 'success';

export function IntroCallPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>('calendar');

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [is24Hour, setIs24Hour] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: 'Google Meet',
        phoneCountryCode: '',
        phoneNumber: '',
        notes: '',
        guests: [] as string[]
    });
    const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);
    const [guestInput, setGuestInput] = useState('');
    const [showGuestInput, setShowGuestInput] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Base times in 24-hour format
    const baseTimeSlots = [
        { h: 15, m: 0 }, { h: 15, m: 15 }, { h: 15, m: 30 }, { h: 15, m: 45 },
        { h: 16, m: 0 }, { h: 16, m: 15 }, { h: 16, m: 30 }, { h: 16, m: 45 },
    ];

    const formatTime = (h: number, m: number, is24: boolean) => {
        const minuteStr = m.toString().padStart(2, '0');
        if (is24) return `${h}:${minuteStr}`;
        const period = h >= 12 ? 'pm' : 'am';
        const hour12 = h % 12 || 12;
        return `${hour12}:${minuteStr}${period}`;
    };

    const getEndTime = (startTime: string) => {
        if (!startTime) return '';
        // Parse the start time string back to hours and minutes
        // This is a simplified parser assuming the format from formatTime
        let h, m;
        const is24 = startTime.includes(':') && !startTime.includes('m');
        if (is24) {
            const [hStr, mStr] = startTime.split(':');
            h = parseInt(hStr);
            m = parseInt(mStr);
        } else {
            const [time, period] = startTime.split(/(am|pm)/);
            const [hStr, mStr] = time.split(':');
            h = parseInt(hStr);
            if (period === 'pm' && h !== 12) h += 12;
            if (period === 'am' && h === 12) h = 0;
            m = parseInt(mStr);
        }

        // Add 15 minutes
        let endM = m + 15;
        let endH = h;
        if (endM >= 60) {
            endM -= 60;
            endH += 1;
        }

        return formatTime(endH, endM, is24);
    };

    const timezones = [
        { label: "Asia/Ashgabat", value: "Asia/Ashgabat" }, // Simplified labels for better fit
        { label: "Asia/Samarkand", value: "Asia/Samarkand" },
        { label: "Asia/Tashkent", value: "Asia/Tashkent" },
        { label: "Asia/Calcutta", value: "Asia/Calcutta" }, // Changed to Calcutta to match image
    ];

    const [selectedTimezone, setSelectedTimezone] = useState(timezones[3]);

    // Calendar Logic
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => {
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysCount = getDaysInMonth(currentYear, currentMonth);
    const startDay = getFirstDayOfMonth(currentYear, currentMonth);
    const emptySlots = Array.from({ length: startDay });
    const daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const isPrevDisabled = currentYear === today.getFullYear() && currentMonth === today.getMonth();

    const handlePrevMonth = () => {
        if (isPrevDisabled) return;
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
        setSelectedDate(null);
    };
    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    const getFormattedFullDate = () => {
        if (!selectedDate) return "";
        const date = new Date(currentYear, currentMonth, selectedDate);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Form Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'location' && value !== 'Phone') {
                next.phoneCountryCode = '';
                next.phoneNumber = '';
            }
            return next;
        });
        if (name === 'location' && value !== 'Phone') {
            setPhoneValue(undefined);
        }
    };

    const handlePhoneChange = (value?: string) => {
        setPhoneValue(value);
        if (!value) {
            setFormData(prev => ({ ...prev, phoneCountryCode: '', phoneNumber: '' }));
            return;
        }
        const parsed = parsePhoneNumberFromString(value);
        if (!parsed) {
            setFormData(prev => ({ ...prev, phoneCountryCode: '', phoneNumber: '' }));
            return;
        }
        setFormData(prev => ({
            ...prev,
            phoneCountryCode: `+${parsed.countryCallingCode}`,
            phoneNumber: parsed.nationalNumber,
        }));
    };

    const handleAddGuest = () => {
        if (guestInput.trim() && !formData.guests.includes(guestInput)) {
            setFormData(prev => ({ ...prev, guests: [...prev.guests, guestInput] }));
            setGuestInput('');
        }
    };

    const handleNextStep = () => {
        if (selectedDate && selectedTimeSlot) {
            setStep('form');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const dateObj = new Date(currentYear, currentMonth, selectedDate!);
            const payload = {
                ...formData,
                date: dateObj.toISOString(),
                timeSlot: selectedTimeSlot,
                duration: 15
            };

            const response = await fetch(`/api/intro-call`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to schedule');
            }

            setStep('success');
            toast.success('Meeting scheduled successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsTimezoneOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (step !== 'success') return;
        const timeoutId = window.setTimeout(() => {
            router.push('/');
        }, 6000);

        return () => window.clearTimeout(timeoutId);
    }, [router, step]);

    const renderLeftPanel = () => (
        <div className="w-full md:w-[320px] p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-[#1f1f1f] flex flex-col shrink-0 relative">
            {step === 'form' && (
                <button
                    onClick={() => setStep('calendar')}
                    className="absolute top-6 left-6 p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-[#1f1f1f] transition-colors text-slate-500 dark:text-[#a1a1a1]"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            )}

            <div className={`mb-4 ${step === 'form' ? 'mt-12' : ''}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                        src="https://github.com/syedomer17.png"
                        alt="Rinkit Adhana"
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                        sizes="48px"
                    />
                </div>
            </div>

            <p className="dark:text-[#a1a1a1] font-bold font-instagram font-semibold mb-1 text-slate-500 text-sm">Syed Omer Ali</p>
            <h1 className="dark:text-[#e1e1e1] font-bold font-instagram mb-4 text-2xl text-slate-900">Intro Call</h1>

            {/* Description always visible */}
            <p className="dark:text-[#a1a1a1] font-instagram leading-relaxed mb-4 text-[15px] text-slate-600">
                This is a quick 15-minute intro call for initial conversations around projects, paid work, collaborations, job offers, and other relevant opportunities.
            </p>
            <p className="dark:text-[#a1a1a1] font-instagram leading-relaxed mb-8 text-[15px] text-slate-600">
                Please note that this link is strictly not intended for guidance, mentoring, or advice sessions.
            </p>

            <div className="space-y-3 text-slate-500 dark:text-[#a1a1a1] text-[15px] font-medium mb-8">
                {step === 'form' ? (
                    <>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-slate-900 dark:text-white shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-slate-600 dark:text-[#e1e1e1]">{getFormattedFullDate()}</span>
                                <span className="text-slate-600 dark:text-[#e1e1e1]">{selectedTimeSlot} - {getEndTime(selectedTimeSlot || '')}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-slate-900 dark:text-white" />
                            <span className="dark:text-[#e1e1e1] font-instagram text-slate-600">15m</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-slate-900 dark:text-white" />
                            <span className="dark:text-[#e1e1e1] font-instagram text-slate-600">2 location options</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-slate-900 dark:text-white" />
                            <span className="text-slate-600 dark:text-[#e1e1e1]">{selectedTimezone.value}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-slate-900 dark:text-white" />
                            <span className="dark:text-[#e1e1e1] font-instagram text-slate-600">15m</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-slate-900 dark:text-white" />
                            <span className="dark:text-[#e1e1e1] font-instagram text-slate-600">2 location options</span>
                        </div>
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className={`flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#1f1f1f] py-1 px-1 -ml-1 rounded transition-colors w-fit ${isTimezoneOpen ? 'bg-slate-100 dark:bg-[#1f1f1f]' : ''}`}
                                onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                            >
                                <Globe className="w-5 h-5 text-slate-900 dark:text-white" />
                                <span className="text-slate-600 dark:text-[#e1e1e1]">{selectedTimezone.value}</span>
                                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isTimezoneOpen ? 'rotate-180' : ''}`} />
                            </div>
                            {isTimezoneOpen && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#333] rounded-md shadow-lg dark:shadow-2xl z-50 text-sm overflow-hidden py-1">
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                        {timezones.map((tz) => (
                                            <button
                                                key={tz.value}
                                                onClick={() => { setSelectedTimezone(tz); setIsTimezoneOpen(false); }}
                                                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#2c2c2c] transition-colors ${selectedTimezone.value === tz.value ? 'bg-slate-50 dark:bg-[#2c2c2c]' : 'text-slate-600 dark:text-[#a1a1a1]'}`}
                                            >
                                                <span className={selectedTimezone.value === tz.value ? 'text-slate-900 dark:text-white' : ''}>{tz.label}</span>
                                                {selectedTimezone.value === tz.value && <Check className="w-4 h-4 text-slate-900 dark:text-white" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    if (step === 'success') {
        return (
            <div
                className="min-h-screen bg-white dark:bg-[#0B0D10] flex flex-col items-center justify-center p-4 text-slate-900 dark:text-zinc-300 transition-colors duration-300 font-['Instagram_Sans',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]"
            >
                <div className="max-w-md w-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-lg shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600 dark:text-green-500" />
                    </div>
                    <h2 className="dark:text-white font-bold font-instagram mb-2 text-2xl text-slate-900">Meeting Scheduled!</h2>
                    <p className="dark:text-[#a1a1a1] font-instagram mb-8 text-slate-500">
                        Your intro call has been confirmed. A calendar invitation has been sent to your email address.
                    </p>
                    <div className="bg-slate-50 dark:bg-[#1c1c1c] rounded-lg p-4 mb-8 text-left">
                        <p className="dark:text-white font-bold font-instagram font-semibold mb-1 text-slate-900">Intro Call</p>
                        <p className="dark:text-[#a1a1a1] font-instagram mb-2 text-slate-500 text-sm">{getFormattedFullDate()}</p>
                        <p className="dark:text-[#a1a1a1] font-instagram text-slate-500 text-sm">{selectedTimeSlot}</p>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-slate-900 dark:bg-white dark:text-black font-instagram font-semibold hover:opacity-90 py-2.5 rounded-md text-white transition-opacity w-full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-white dark:bg-[#0B0D10] flex flex-col items-center justify-center p-4 text-slate-900 dark:text-zinc-300 transition-colors duration-300 font-['Instagram_Sans',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif]"
        >

            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-50">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            <div className={`max-w-[1060px] w-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-lg shadow-sm dark:shadow-none flex flex-col md:flex-row overflow-visible transition-colors duration-300 ${step === 'form' ? 'min-h-[500px]' : ''}`}>

                {renderLeftPanel()}

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col">

                    {step === 'calendar' ? (
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Calendar */}
                            <div className="flex-1 p-6 md:px-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-[#1f1f1f] pt-6 md:pt-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="dark:text-white font-instagram font-medium text-lg text-slate-900">{monthNames[currentMonth]} {currentYear}</h2>
                                    <div className="flex items-center gap-2">
                                        <button onClick={handlePrevMonth} disabled={isPrevDisabled} className={`p-1 rounded transition-colors ${isPrevDisabled ? 'text-slate-300 dark:text-[#333] cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-[#222] text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300'}`}>
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button onClick={handleNextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-[#222] rounded transition-colors text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300">
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 mb-2 text-center">
                                    {weekDays.map(day => <div key={day} className="dark:text-[#888] font-bold font-instagram py-2 text-[11px] text-slate-400 tracking-wider">{day}</div>)}
                                </div>

                                <div className="grid grid-cols-7 gap-3 text-center">
                                    {emptySlots.map((_, i) => <div key={`empty-${i}`} className="aspect-square w-full" />)}
                                    {daysInMonth.map(day => {
                                        const isSelected = selectedDate === day;
                                        const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
                                        const isPastDay = currentYear === today.getFullYear() && currentMonth === today.getMonth() && day < today.getDate();
                                        return (
                                            <div key={day} className="aspect-square w-full">
                                                <button
                                                    onClick={() => !isPastDay && setSelectedDate(day)}
                                                    disabled={isPastDay}
                                                    className={`w-full h-full rounded-[4px] flex flex-col items-center justify-center font-instagram text-sm font-semibold transition-all relative ${isPastDay ? 'bg-slate-100 dark:bg-[#0f0f0f] text-slate-300 dark:text-[#555] cursor-not-allowed' : isSelected ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'bg-slate-50 dark:bg-[#1c1c1c] text-slate-700 dark:text-[#e1e1e1] hover:bg-slate-100 dark:hover:bg-[#252525] hover:border hover:border-slate-300 dark:hover:border-zinc-700'}`}
                                                >
                                                    {day}
                                                    {isToday && <div className={`mt-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white dark:bg-black' : isPastDay ? 'bg-slate-300 dark:bg-[#555]' : 'bg-slate-900 dark:bg-white'}`}></div>}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div className="w-full md:w-[300px] p-6 shrink-0 flex flex-col bg-white dark:bg-[#111111] pt-6 md:pt-10">
                                {selectedDate ? (
                                    <>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-slate-500 dark:text-[#a1a1a1] font-medium">
                                                {new Date(currentYear, currentMonth, selectedDate).toLocaleDateString('en-US', { weekday: 'short' })} {selectedDate.toString().padStart(2, '0')}
                                            </h3>
                                            <div className="flex bg-slate-100 dark:bg-[#1c1c1c] rounded p-0.5">
                                                <button onClick={() => setIs24Hour(false)} className={`px-3 py-1 text-xs rounded transition-colors ${!is24Hour ? 'bg-white dark:bg-[#2c2c2c] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-[#a1a1a1] hover:text-slate-900 dark:hover:text-white'}`}>12h</button>
                                                <button onClick={() => setIs24Hour(true)} className={`px-3 py-1 text-xs rounded transition-colors ${is24Hour ? 'bg-white dark:bg-[#2c2c2c] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-[#a1a1a1] hover:text-slate-900 dark:hover:text-white'}`}>24h</button>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto custom-scrollbar md:h-[400px] max-h-[400px]">
                                            <div className="space-y-3">
                                                {baseTimeSlots.map((slot, index) => {
                                                    const timeString = formatTime(slot.h, slot.m, is24Hour);
                                                    const isSelected = selectedTimeSlot === timeString;
                                                    return (
                                                        <div key={index} className="flex gap-2">
                                                            <button
                                                                onClick={() => setSelectedTimeSlot(timeString)}
                                                                className={`flex-1 py-3 px-4 rounded-[4px] border text-sm font-bold transition-all text-center ${isSelected ? 'bg-slate-700 dark:bg-[#333] border-slate-700 dark:border-white/20 text-white w-1/2' : 'bg-white dark:bg-[#111] border-slate-200 dark:border-[#2c2c2c] text-slate-700 dark:text-[#e1e1e1] hover:border-slate-400 dark:hover:border-zinc-500 w-full'}`}
                                                            >
                                                                {timeString}
                                                            </button>
                                                            {/* Next Button Animation */}
                                                            {isSelected && (
                                                                <button
                                                                    onClick={handleNextStep}
                                                                    className="flex-1 py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[4px] text-sm font-bold transition-all hover:opacity-90 animate-in fade-in slide-in-from-left-2 duration-200"
                                                                >
                                                                    Next
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-[#a1a1a1] text-sm h-[200px] md:h-auto">
                                        Select a date to view available times
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Form Step */
                        <div className="flex-1 p-6 md:p-8 pt-6 md:pt-10">
                            <form onSubmit={handleSubmit} className="max-w-[400px]">
                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">Your name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-[#666] transition-colors"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">Email address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-[#666] transition-colors"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">Location</label>
                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="Google Meet"
                                                    checked={formData.location === 'Google Meet'}
                                                    onChange={handleInputChange}
                                                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-[#666] rounded-full checked:border-blue-500 dark:checked:border-blue-500 checked:bg-transparent transition-all"
                                                />
                                                <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                            <span className="text-slate-700 dark:text-[#e1e1e1] font-medium">Google Meet</span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="Phone"
                                                    checked={formData.location === 'Phone'}
                                                    onChange={handleInputChange}
                                                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-[#666] rounded-full checked:border-blue-500 dark:checked:border-blue-500 checked:bg-transparent transition-all"
                                                />
                                                <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                            <span className="text-slate-700 dark:text-[#e1e1e1] font-medium">Attendee phone number</span>
                                        </label>

                                        {formData.location === 'Phone' && (
                                            <div className="mt-2">
                                                <PhoneInput
                                                    international
                                                    defaultCountry="US"
                                                    value={phoneValue}
                                                    onChange={handlePhoneChange}
                                                    className="introcall-phone"
                                                    numberInputProps={{
                                                        placeholder: "Your phone number",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">Additional notes</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Please share anything that will help prepare for our meeting."
                                        className="w-full bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-[#666] focus:outline-none focus:border-slate-400 dark:focus:border-[#666] transition-colors resize-none"
                                    />
                                </div>

                                <div className="mb-6">
                                    {!showGuestInput ? (
                                        <button
                                            type="button"
                                            onClick={() => setShowGuestInput(true)}
                                            className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-semibold transition-colors"
                                        >
                                            <UserPlus className="w-5 h-5" />
                                            Add guests
                                        </button>
                                    ) : (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Add guests</label>
                                            <div className="relative mb-2">
                                                <input
                                                    type="email"
                                                    value={guestInput}
                                                    onChange={(e) => setGuestInput(e.target.value)}
                                                    placeholder="Email"
                                                    className="w-full bg-white dark:bg-[#111] border border-slate-300 dark:border-[#333] rounded-lg pl-4 pr-10 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-[#666] transition-colors"
                                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddGuest(); } }}
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => { setShowGuestInput(false); setGuestInput(''); }}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {formData.guests.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {formData.guests.map((guest, i) => (
                                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-[#e1e1e1] text-sm border border-slate-200 dark:border-[#333]">
                                                            {guest}
                                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, guests: prev.guests.filter((_, idx) => idx !== i) }))} className="hover:text-red-500 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-[#333] transition-colors">×</button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs text-slate-500 dark:text-[#666] mb-6">
                                    By proceeding, you agree to our <span className="text-slate-900 dark:text-[#e1e1e1] font-semibold">Terms</span> and <span className="text-slate-900 dark:text-[#e1e1e1] font-semibold">Privacy Policy</span>.
                                </p>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep('calendar')}
                                        className="px-6 py-2.5 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-[#1f1f1f] rounded-full transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Confirming...' : 'Confirm'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
    .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
         .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
         .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1; /* slate-300 */
    border-radius: 20px;
}
         .dark.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 20px;
}

                .introcall-phone {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                }

                .introcall-phone .PhoneInputCountry,
                .introcall-phone .PhoneInputInput {
                    height: 44px;
                    border-radius: 0.5rem;
                    border: 1px solid #cbd5e1;
                    background: #ffffff;
                    color: #0f172a;
                    font-size: 0.95rem;
                    padding: 0 12px;
                    outline: none;
                    transition: border-color 0.2s ease;
                }

                .introcall-phone .PhoneInputInput {
                    width: 100%;
                }

                .introcall-phone .PhoneInputCountrySelect {
                    background: transparent;
                    color: inherit;
                    font-size: 0.95rem;
                }

                .introcall-phone .PhoneInputCountry:focus-within,
                .introcall-phone .PhoneInputInput:focus {
                    border-color: #94a3b8;
                }

                .dark .introcall-phone .PhoneInputCountry,
                .dark .introcall-phone .PhoneInputInput {
                    background: #111111;
                    border-color: #333333;
                    color: #ffffff;
                }

                .dark .introcall-phone .PhoneInputCountrySelect {
                    background: #111111;
                    color: #ffffff;
                    color-scheme: dark;
                }

                .dark .introcall-phone .PhoneInputCountrySelect option {
                    background: #111111;
                    color: #ffffff;
                }

                .dark .introcall-phone .PhoneInputCountry:focus-within,
                .dark .introcall-phone .PhoneInputInput:focus {
                    border-color: #666666;
                }
`}</style>
        </div>
    );
}
