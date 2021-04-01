import React from 'react'
import SbEditable from 'storyblok-react'

const Alert = (props) => {
  const icon = props.blok.alertIcon ? props.blok.alertIcon : false;
  const color = props.blok.color.color ? props.blok.color.color : "none";
  const title = props.blok.alertTitle ? props.blok.alertTitle[0].toUpperCase() : "ALERT";
  const text = props.blok.alertText ? props.blok.alertText : "";
  const link = props.blok.alertLink ? props.blok.alertLink.url : false;
  const linkTitle = props.blok.alertLinkTitle ? props.blok.alertLinkTitle : link;

  const [closed, setState] = React.useState(false);

  return (
    <SbEditable content={props.blok}>
      <div className={closed ? "su-global-footer alert closed" : "su-global-footer alert"} style={{backgroundColor: color}}>
        <div className="su-global-footer__content">
          <nav aria-label="global footer menu">
            <ul className="su-global-footer__menu su-global-footer__menu--global">
              {icon && <li><img src={icon} alt="Alert icon" width="20" height="20"/></li>}
              <li><span>{title + ': '}</span></li>
              <li><span>{text} {link && <a href={link} title={linkTitle}>{linkTitle}</a>}</span></li>
              <li><span>DISMISS</span></li>
              <li><a href="#" className={"close"} onClick={()=>{setState(!closed)}}> </a></li>
            </ul>
          </nav>
        </div>
      </div>
    </SbEditable>
  )
};

export default Alert
