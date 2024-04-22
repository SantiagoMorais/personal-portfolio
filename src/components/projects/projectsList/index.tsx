import { useContext, useState } from "react";
import styled from "styled-components"
import { StackIcons } from "github-automated-repos";
import { fonts } from "@styles/variables";
import { ThemeContext } from "@contexts/themeContext";
import imageNotFound from "@assets/image-not-found.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface IProjectsListProps {
    data: {
        banner: string,
        description: string,
        homepage: string,
        html_url: string,
        id: number,
        name: string,
        topics: string[]
    }[];
}

export const ProjectsList: React.FC<IProjectsListProps> = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const [showImage, setShowImage] = useState<number | null>(null);

    const handleShowImage = (id: number) => {
        showImage === id ? setShowImage(null) : setShowImage(id);
    }

    return (
        <Container theme={theme}>
            {data.length > 0 && data.map((project) =>
                <div className="project" key={project.id} style={showImage !== project.id && showImage !== null ? { display: "none" } : {}}>
                    <div className="banner">
                        {/* <img src={bannerUrls[index] ? bannerUrls[index] : imageNotFound} alt={project.name} /> */}
                        <img src={project.banner ? project.banner : imageNotFound} alt={project.name} />
                    </div>
                    <h3 className="name">{project.name.replace(/-/g, " ")}</h3>
                    <p className="description">{project.description}</p>
                    <div className="icons">
                        {project.topics.map((icon, index) =>
                            icon !== "portfolio" && icon !== "contextapi" &&
                            <StackIcons key={index} itemTopics={icon} className={icon} />
                        )}
                    </div>
                    <div className="buttons">
                        <button className="button">
                            <a href={project.homepage} target="_blank">Web Page</a>
                        </button>
                        <button className="button">
                            <a href={project.html_url} target="_blank">Github repository</a>
                        </button>
                        <button className="seeImage" onClick={() => handleShowImage(project.id)}>
                            <FontAwesomeIcon icon={faPlus} className="icon" />
                        </button>
                    </div>
                    <div className="message">
                        <p>
                            See more details
                            <FontAwesomeIcon icon={faHandPointer} className="icon" />
                        </p>
                    </div>
                    <div className={`projectImage ${showImage !== project.id && "hiddeImage"}`} >
                        <div className="window">
                            <button className="closeWindow" onClick={() => handleShowImage(project.id)}>
                                <FontAwesomeIcon icon={faTimes} className="icon" />
                            </button>
                            <img src={project.banner} alt={`Project image: ${project.name}`} className="image" />
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5rem;

    .project {
        flex: 1;
        flex-basis: 0;
        border-radius: .8rem;
        background-color: ${({ theme }) => theme.textColor};
        color: ${({ theme }) => theme.secondaryTextColor};
        width: max-content;
        overflow: hidden;
        min-width: 35rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        padding-bottom: 1rem;
        border: .2rem solid transparent;
        position: relative;

        &:hover > .buttons {
            opacity: 1;
        }
        
        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: ${({ theme }) => theme.secondaryColor};
            opacity: 0;
            transform: scaleY(0);
            transform-origin: bottom;
            transition: transform .5s, opacity .5s;
            z-index: 2;
        }
        
        &:hover::before {
            transform: scaleX(1);
            opacity: .6;
        }
        
        &:not(:hover)::before {
            transform: scaleY(0);
        }

        .banner {
            img {
                width: 100%;
                height: 40rem;
                object-fit: cover;
                object-position: top center;
                border-bottom: .2rem solid ${({ theme }) => theme.secondaryTextColor};
            }
        }

        .name {
            text-transform: capitalize;
            text-align: center;
            font-size: ${fonts.fontSizeMedium};
        }

        .description {
            text-align: center;
            font-size: ${fonts.fontSizeSmall};
        }

        .icons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
            padding: 1rem;
            background-color: ${({ theme }) => theme.textColor};
            
            img {
                width: 4rem;
                filter: grayscale(0%);
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding: 0 1rem;
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 2;
            transition: .5s;
            height: 300%;
            opacity: 0;
            justify-content: center;

            &:hover {
                height: 100%;
                opacity: 1;
            }

            .button {
                width: 90%;
                border-radius: 0 2rem 0 2rem;
                background-color: ${({ theme }) => theme.textColor};
                height: fit-content;
                overflow: hidden;
                transition: .5s;
                border: .2rem solid transparent;
                
                &:hover {
                    box-shadow: 0 0 1rem ${({ theme }) => theme.secondaryTextColor};
                    border-color: ${({ theme }) => theme.textColor};
                    background-color: ${({ theme }) => theme.tertiaryColor};
                }
                
                &:hover > a {
                    color: ${({ theme }) => theme.textColor};
                }
                
                a {
                    color: ${({ theme }) => theme.secondaryTextColor};
                    padding: .2rem 1rem;
                    font-size: ${fonts.fontSizeLarge};
                    width: 100%;
                    display: inline-block;
                    cursor: pointer;
                    transition: .5s;
                }
            }

            .seeImage {
                font-size: ${fonts.fontSizeLarge};
                padding: 1rem;
                width: 6rem;
                height: 6rem;
                border-radius: 1rem;
                transition: .5s;
                cursor: pointer;
                border: .2rem solid transparent;
                color: ${({ theme }) => theme.secondaryTextColor};
                background-color: ${({ theme }) => theme.textColor};

                &:hover {
                    box-shadow: 0 0 1rem ${({ theme }) => theme.secondaryTextColor};
                    border-color: ${({ theme }) => theme.textColor};
                    background-color: ${({ theme }) => theme.tertiaryColor};
                    color: ${({ theme }) => theme.textColor};
                }
            }
        }

        .message {
            text-align: center;
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0 1rem;
            
            p {
                font-size: ${fonts.fontSizeMedium};
                background-color: ${({ theme }) => theme.secondaryTextColor};
                border: .2rem solid transparent;
                padding: .2rem 1rem;
                border-radius: .8rem;
                color: ${({ theme }) => theme.textColor};
                max-width: 30rem;
                width: 100%;
                display: flex;
                gap: 1rem;
                align-items: center;
                justify-content: center;
            }
        }

        .projectImage {
            z-index: 3;
            position: fixed;
            width: 100dvw;
            min-height: 100dvh;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            
            &.hiddeImage {
                display: none;
            }

            &::before {
                content: '';
                position: absolute;
                width: 100dvw;
                min-height: 100dvh;
                background-color: ${({ theme }) => theme.tertiaryColor};
                opacity: .6;
            }

            .window {
                width: 90dvw;
                max-width: 144rem;
                height: fit-content;
                max-height: 90dvh;
                overflow-y: auto;
                display: flex;
                justify-content: center;
                border-radius: 3rem 0 0 3rem;
                position: relative;
                border: .2rem solid ${({ theme }) => theme.textColor};
            }

            .closeWindow {
                position: fixed;
                top: 7dvh;
                left: 7dvw;
                z-index: 4;
                cursor: pointer;
                background: ${({ theme }) => theme.textColor};
                color: ${({ theme }) => theme.secondaryTextColor};
                opacity: .6;
                border-radius: 1rem;
                border: .2rem solid transparent;
                transition: .5s;
                overflow: hidden;

                &:hover {
                    opacity: 1;
                }

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background: ${({ theme }) => theme.secondaryColor};
                    opacity: 0;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform .5s, opacity .5s;
                    z-index: 0;
                  }
                  
                &:hover::before {
                    transform: scaleX(1);
                    opacity: 1;
                }
                
                &:not(:hover)::before {
                    transform: scaleX(0);
                    transform-origin: right;
                }

                .icon {
                    padding: 1rem;
                    width: 5rem;
                    height: 5rem;
                    position: relative;
                }
            }

            .image {
                width: 100%;
                height: max-content;
            }
        }
    }

    @media (max-width: 600px) {
        .project {
            min-width: 25rem;

            .projectImage {
                .closeWindow {
                    .icon {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            }
        }
    }
`