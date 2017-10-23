import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MainHeader from './MainHeader/MainHeader';
// import MainFooter from 'components/MainFooter/MainFooter';
// import Spinner from 'components/Spinner/Spinner';
// import 'styles/admin.scss';

const mapStateToProps = ({ spinner }) => ({ spinner });
const HeroPageLayout = (props) =>
  (
    <div id="admin-layout" className="page-container">
      <MainHeader />
      <div className="view-container">
        {props.children}
      </div>
    </div>
  );

HeroPageLayout.propTypes = {
  spinner: PropTypes.object,
  children: PropTypes.element,
};

export default connect(mapStateToProps)(HeroPageLayout);
