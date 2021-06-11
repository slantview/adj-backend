import { faDiscord, faFacebook, faInstagram, faPatreon, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const SocialIcons = (props) => {
    const {
        facebook,
        instagram,
        twitter,
        twitch,
        youtube,
        patreon,
        discord,
        className,
        itemClassName
    } = props;
    return (
        <div className={className}>
            { facebook &&
                <div className={itemClassName}>
                    <a href={facebook} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faFacebook} />
                    </a>
                </div>
            }
            { instagram &&
                <div className={itemClassName}>
                    <a href={instagram} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faInstagram} />
                    </a>
                </div>
            }
            { twitter &&
                <div className={itemClassName}>
                    <a href={twitter} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faTwitter} />
                    </a>
                </div>
            }
            { twitch &&
                <div className={itemClassName}>
                    <a href={twitch} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faTwitch} />
                    </a>
                </div>
            }
            { youtube &&
                <div className={itemClassName}>
                    <a href={youtube} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faYoutube} />
                    </a>
                </div>
            }
            { patreon &&
                <div className={itemClassName}>
                    <a href={patreon} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faPatreon} />
                    </a>
                </div>
            }
            { discord &&
                <div className={itemClassName}>
                    <a href={discord} target="new" className="hover:text-blue-400 m-0">
                        <FontAwesomeIcon className="w-10 h-10 inline-block text-gray-500 hover:text-blue-400" icon={faDiscord} />
                    </a>
                </div>
            }
        </div>
    )
}

export default SocialIcons;
