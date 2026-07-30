import React, { useEffect, useState } from "react";
import { Spending } from "../utility/type";
import { useUpdateExpense } from "@/lib/hooks/useUpdateExpense";
import { X } from "lucide-react";

interface Prop {
    spending: Spending;
    onClose: () => void;
}

export default function EditModal({ spending, onClose }: Prop) {
    const [costItem, setCostItem] = useState<Spending>(spending);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const { mutate: updateExpense } = useUpdateExpense();

    useEffect(() => {
        if(costItem.store !== spending.store || costItem.amount !== spending.amount) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }, [costItem]);

    function saveChanges() {
        updateExpense({
            id: costItem.id,
            store: costItem.store,
            amount: costItem.amount,
        });

        onClose();
    }

    return (
        <div className="backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h1>Ausgabe bearbeiten</h1>
                    <button title="Fenster schließen" onClick={onClose}><X /></button>
                </div>
                <div className="modal-content">
                    <label htmlFor="laden">Laden</label><br />
                    <input 
                        className="mb-4" 
                        type="text" 
                        name="laden" 
                        id="laden" 
                        defaultValue={spending.store} 
                        placeholder="Laden"
                        title="Laden bearbeiten"
                        onChange={(e) => setCostItem({...costItem, store: e.target.value})} 
                    /><br />
                    <label htmlFor="ausgabe">Ausgabe (EUR)</label><br />
                    <input 
                        className="mb-4" 
                        type="number" 
                        step="any" 
                        name="ausgabe" 
                        id="ausgabe" 
                        defaultValue={spending.amount} 
                        placeholder="Ausgabe"
                        title="Ausgabe bearbeiten"
                        onChange={(e) => setCostItem({...costItem, amount: Number(e.target.value)})}
                    /><br />
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        disabled={isDisabled} 
                        className="cancel-button"
                        title="Änderungen verwerfen"
                        onClick={onClose}
                    >
                        Verwerfen
                    </button>
                    <button 
                        disabled={isDisabled} 
                        className="action-button"
                        title="Änderungen speichern"
                        onClick={saveChanges}
                    >
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    );
}