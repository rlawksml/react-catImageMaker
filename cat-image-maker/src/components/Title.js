const Title = ({counter}) => {
  return (
    <h2>
      {counter > 0 ? `${counter}번째 고양이 이미지 생성`:'고양이 이미지 생성'}
    </h2>
  )
}

export default Title