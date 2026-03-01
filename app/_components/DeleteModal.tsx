import Icon from "../_ui/Icon";
import { Spending } from "../utility/type";

interface Prop {
    spending: Spending;
    setSpendings: React.Dispatch<React.SetStateAction<Spending[]>>;
    onClose: () => void;
}

export default function DeleteModal({
    spending,
    setSpendings,
    onClose
}: Prop) {

    function deleteItem() {
        setSpendings(prev =>
            prev.filter(item => item.id !== spending.id)
        );

        onClose();
    }

    return (
        <div className="backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h1>Bist Du Dir sicher?</h1>
                    <button onClick={onClose}>
                        <Icon name="closeIcon" className="w-8 h-8" />
                    </button>
                </div>
                <div className="modal-content">
                    <p className="mb-4">Möchtest du wirklich die Ausgabe vom {spending.day}.{spending.month}.{spending.year} bei {spending.store} in Höhe von {spending.amount}&euro; löschen?</p>
                </div>
                <div className="modal-footer">
                    <button 
                        onClick={onClose} 
                        className="cancel-button" 
                        title="Ausgabe behalten"
                    >
                        Behalten
                    </button>
                    <button 
                        onClick={deleteItem} 
                        className="action-button" 
                        title="Ausgabe löschen"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    );
}