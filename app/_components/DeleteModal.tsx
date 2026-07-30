import { X } from "lucide-react";
import { Spending } from "../utility/type";
import { useDeleteExpense } from "@/lib/hooks/useDeleteExpense";

interface Prop {
    spending: Spending;
    onClose: () => void;
}

export default function DeleteModal({
    spending,
    onClose
}: Prop) {
    const { mutate: deleteExpense } = useDeleteExpense();

    function deleteItem() {
        deleteExpense(spending.id);
        onClose();
    }

    return (
        <div className="backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h1>Bist Du Dir sicher?</h1>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="modal-content">
                    <p className="mb-4">Möchtest du wirklich die Ausgabe vom {spending.day}.{spending.month}.{spending.year} bei {spending.store} in Höhe von {spending.amount}&euro; löschen?</p>
                </div>
                <div className="modal-footer">
                    <button 
                        onClick={onClose} 
                        className="action-button" 
                        title="Ausgabe behalten"
                    >
                        Behalten
                    </button>
                    <button 
                        onClick={deleteItem} 
                        className="cancel-button" 
                        title="Ausgabe löschen"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    );
}