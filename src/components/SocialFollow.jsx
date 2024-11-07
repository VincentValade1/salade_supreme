import '../styles/SocialFollow.css';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

function SocialFollow() {
    return (
        <div className="social-follow-div">
            <span>Suivez-nous sur les réseaux :</span>
            <div className="social-follow-icons-div">
                <a tabIndex="0" aria-label="lien vers page Facebook" href="https://www.facebook.com/profile.php?id=61558040728919" target="_blank" rel="noreferrer noopener" ><BsFacebook /></a>
                <a tabIndex="0" aria-label="lien vers page Instagram" href="https://www.instagram.com/chez.babayaga.toulouse/" target="_blank" rel="noreferrer noopener" ><BsInstagram /></a>
            </div>
        </div>
    )
}

export default SocialFollow;