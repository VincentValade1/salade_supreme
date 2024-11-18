import '../styles/BlueButton.css';

function BlueButton({blueButtonLinkLign, className}) {
    return (
        <div className={`blue-button-div ${className ? className : ''}`}>
            <button className="blue-button">
                {blueButtonLinkLign}
            </button>
        </div>
    )
}

export default BlueButton;