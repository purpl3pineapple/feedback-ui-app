import PropTypes from 'prop-types';

const Header = ({ txt, bgColor, txtColor }) => {

    const headerStyle = {
        backgroundColor: bgColor,
        color: txtColor
    };

  return (
    <header style={headerStyle}>
        <div className="container">
            <h2>{txt}</h2>
        </div>
      
    </header>
  );
}

Header.defaultProps = {
    txt: 'Feedback UI',
    bgColor: 'rgba(0,0,0,0.4)',
    txtColor: '#ff6a95'
};

Header.propTypes = {
    txt: PropTypes.string,
    bgColor: PropTypes.string,
    txtColor: PropTypes.string
};

export default Header
