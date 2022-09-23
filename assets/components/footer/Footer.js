import React from 'react';
import { Button } from '../../globalStyles';

import { FaBars, FaTimes,FaInstagram,FaTwitter,FaDiscord } from 'react-icons/fa';
import {  FcReddit} from 'react-icons/fc';
import {
  FooterContainer,
  FooterSubscription,
  FooterSubText,
  FooterSubHeading,
  Form,
  FormInput,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink


} from './Footer.elements';

import tableIcon from "../navbar/icon.png"

function Footer() {
  return (
    <FooterContainer>
      <FooterSubscription>
        <FooterSubHeading>
          Join our exclusive membership to receive the latest news and trends
        </FooterSubHeading>
        <FooterSubText>You can unsubscribe at any time.</FooterSubText>
        <Form>
          <FormInput name='email' type='email' placeholder='Your Email' />
          <Button fontBig>Subscribe</Button>
        </Form>
      </FooterSubscription>
      <FooterLinksContainer>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>About Us</FooterLinkTitle>
{/*             <FooterLink to='/sign-up'>How it works</FooterLink>
 */}            <FooterLink to='/'>Testimonials</FooterLink>
            <FooterLink to='/'>Careers</FooterLink>
            <FooterLink to='/'>Investors</FooterLink>
            <FooterLink to='/'>Terms of Service</FooterLink>
          </FooterLinkItems>
          <FooterLinkItems>
            <FooterLinkTitle>Contact Us</FooterLinkTitle>
            <FooterLink to='/'>Contact</FooterLink>
            <FooterLink to='/'>Support</FooterLink>
            <FooterLink to='/'>Destinations</FooterLink>
            <FooterLink to='/'>Sponsorships</FooterLink>
          </FooterLinkItems>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLinkItems>
            <FooterLinkTitle>Videos</FooterLinkTitle>
            <FooterLink to='/'>Submit Video</FooterLink>
            <FooterLink to='/'>Ambassadors</FooterLink>
            <FooterLink to='/'>Agency</FooterLink>
            <FooterLink to='/'>Influencer</FooterLink>
          </FooterLinkItems>
          <FooterLinkItems>              
          <FooterLinkTitle>Social Media</FooterLinkTitle>

            <FooterLink href='https://discord.gg/svZv2gXK7W' target='_blank' >Discord</FooterLink>
            <FooterLink href='https://www.instagram.com/web3pixelgrid/' target='_blank' >Instagram</FooterLink>
            <FooterLink href="https://twitter.com/pixelgrid2" target='_blank'>Twitter</FooterLink>            
            <FooterLink href="https://www.reddit.com/user/web3Pixelgrid" target='_blank'>Reddit</FooterLink>

          </FooterLinkItems>
        </FooterLinksWrapper>
      </FooterLinksContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to='/'>

            <img style={{ height: 40, width: 40 }} src={tableIcon} alt="Desksharing Logo" />
            &nbsp;Web3 PixelGrid&nbsp;

            <img style={{ height: 40, width: 40 }} src={tableIcon} alt="Desksharing Logo" />

          </SocialLogo>
          <WebsiteRights>PIXELART MINT © 2022</WebsiteRights>

                                      <SocialIcons>
                            <SocialIconLink  href='https://discord.gg/svZv2gXK7W' target='_blank' aria-label='Discord'><FaDiscord></FaDiscord></SocialIconLink>
                            <SocialIconLink  href='https://twitter.com/pixelgrid2' target='_blank' aria-label='Instagram'><FaTwitter></FaTwitter></SocialIconLink>
                            <SocialIconLink  href='https://www.reddit.com/user/web3Pixelgrid' target='_blank' aria-label='Reddit'><FcReddit></FcReddit></SocialIconLink>
                            <SocialIconLink  href='https://www.instagram.com/web3pixelgrid/' target='_blank' aria-label='Instagram'><FaInstagram></FaInstagram></SocialIconLink>
                            </SocialIcons>
                       
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;