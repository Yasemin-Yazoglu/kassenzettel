import React, { useState } from "react";
import { Date_Enum } from "../utility/enum";
import DateComponent from "./DateComponent";
import { Spending } from "../utility/type";

interface Props {
    setSpendings: React.Dispatch<React.SetStateAction<Spending[]>>;
};

export default function InputContainer({
    setSpendings
}: Props) {
    const today_date = new Date();
    const [costItem, setCostItem] = useState<Spending>({
        id: "",
        year: today_date.getFullYear(),
        month: today_date.getMonth() + 1,
        day: today_date.getDate(),
        store: "",
        amount: 0.0,
    });

    function handleSubmit(newItem: Spending) {
        newItem.id = crypto.randomUUID();
        setSpendings((prev) => [...prev, newItem]);
    }

    return (
        <div >
            <form className="input-container text-white" action={() => handleSubmit(costItem)}>
                <div className="date-row">
                    <div className="input-item date-item">
                        <DateComponent getSelected={(date: number) => setCostItem((prev) => ({...prev, year: date}))} date_type={Date_Enum.YEAR} today={costItem.year} />
                    </div>
                    <div className="input-item date-item">
                        <DateComponent getSelected={(date: number) => setCostItem((prev) => ({...prev, month: date}))} date_type={Date_Enum.MONTH} today={costItem.month} />
                    </div>
                    <div className="input-item date-item">
                        <DateComponent getSelected={(date: number) => setCostItem((prev) => ({...prev, day: date}))} date_type={Date_Enum.DAY} today={costItem.day} />
                    </div>
                </div>
                <input 
                    title="Eingeben in welchem Laden eingekauft wurde"
                    name="store"
                    required 
                    onChange={(e) => setCostItem({...costItem, store: e.target.value})} 
                    className="input-item input-box" 
                    type="text" 
                    placeholder="Laden"
                />
                <input 
                    title="Angeben wie viel ausgegeben wurde"
                    name="amount"
                    required 
                    onChange={(e) => setCostItem({...costItem, amount: Number(e.target.value)})} 
                    className="input-item input-box w-48" 
                    type="number" 
                    step="any"
                    placeholder="Ausgabe"
                />
                <button type="submit" hidden />
            </form>
        </div>
    );
}