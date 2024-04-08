import IInitForChat from '@/utils/constants'

const Message = (props:IInitForChat) => {
    const time = new Date(props.time)
    console.log('Message',  props);
    
    return (
        <div key={time}>
            <p>
                <span className="text-xs bg-lime-700 rounded px-1">{props.user}</span>
                <span style={{fontSize: '8px', backgroundColor: '#EDAAC0', color: '#fff', borderRadius: '4px', padding: '1px 5px', lineHeight: '100%'}}>
                    {time.getHours() < 10 ? '0'+time.getHours():time.getHours()}{':'}
                    {time.getMinutes() < 10 ? '0'+time.getMinutes():time.getMinutes()}{':'}
                    {time.getSeconds()  < 10 ? '0'+time.getSeconds():time.getSeconds()}
                </span>
            </p>
            <div style={{fontSize: '12px', fontWeight: '500', backgroundColor: '#EEE',borderRadius: '4px'}}>{props.message}</div>
      </div> 
    )
}

export default Message;