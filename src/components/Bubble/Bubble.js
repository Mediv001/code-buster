import "./bubble.css"

export const Bubble = ({ children, title = "Title " }) => {
    return (
        <div class="speech-bubble-ds full-width">
            <h3 className="no-margin margin-bot-base line-separator padding-bot-base flex-vertical-center base-gap flex-center">
                {title}
            </h3>
            {children}
            <div class="speech-bubble-ds__arrow-left"></div>
        </div>
    )
}