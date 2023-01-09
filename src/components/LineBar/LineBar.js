import "./LineBar.css"

export const LineBar = ({ data = 0, label = "" }) => {
    return (
        <div className="flex-vertical">
            <div className="flex-horizontal-with-gap spacing-max">
                <span className="small-font-size">{label}</span>
                <span className="small-font-size">{data}</span>
            </div>
            <div className="flex-base linebar-content no-margin">
                <div className="line-height full-width content-complete position-absolute"></div>
                <div style={{width: `${data > 100 ? 100 : data}%`}} className="line-height content-data position-absolute"></div>
            </div>
        </div>
    )
}