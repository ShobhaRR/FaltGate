function ConfirmDialog({
    title,
    onConfirm,
    onCancel
}) {

    return (

        <div className="dialog">

            <h2>{title}</h2>

            <button
                onClick={onConfirm}
            >
                Yes
            </button>

            <button
                onClick={onCancel}
            >
                No
            </button>

        </div>

    );

}

export default ConfirmDialog;