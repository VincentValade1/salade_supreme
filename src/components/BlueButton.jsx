import '../styles/BlueButton.css';

function BlueButton({blueButtonLinkLign}) {
    return (
        <div className="blue-button-div">
            <button className="blue-button">
                {blueButtonLinkLign}
            </button>
        </div>
    )
}

export default BlueButton;