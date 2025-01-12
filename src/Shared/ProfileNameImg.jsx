import React from 'react'

const ProfileNameImg = ({ name }) => {
    const getInitials = (fullName) => {
        if (!fullName) return '';
        const nameParts = fullName.trim().split(' ');
        const firstInitial = nameParts[0]?.[0]?.toUpperCase() ?? '';
        const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0]?.toUpperCase() : '';
        return `${firstInitial}${lastInitial}`;
    };
  return (
    <div>
        {getInitials(name)}
    </div>
  )
}

export default ProfileNameImg