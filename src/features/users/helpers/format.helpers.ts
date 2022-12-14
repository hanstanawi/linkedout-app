import moment from 'moment';

/**
 * @description format birth date to age of the user
 * @param {string} birthDate timestamp of user's birth date (e.g: 1998-09-29T00:00:00.000Z)
 * @return {number} age of the user (current year - birth year)
 */
export function formatBirthDateAsAge(birthDate: string): number {
  const momentBirthDate = moment(birthDate);
  const momentCurrent = moment();
  return momentCurrent.diff(momentBirthDate, 'year');
}

/**
 * @description format date to MonthName Year format (Nov 2021)
 * @param {string} date timestamp (e.g: 1998-09-29T00:00:00.000Z)
 * @returns {string} formatted date
 */
export function formatDate(date: string): string {
  const momentDate = moment(date);
  return momentDate.format('MMM YYYY');
}

/**
 * @description format current job title on user profile
 * @param {IUser} user user object
 * @returns {string} formatted current job title
 */
export function formatCurrentExperience(user: IUser): string {
  if (user.workExperiences.length) {
    const currentExperiences = user.workExperiences.filter(
      (experience) => experience.isCurrent
    );
    if (currentExperiences.length) {
      const sortedExperiences = currentExperiences.sort((a, b) => {
        return moment(b.startDate).diff(moment(a.startDate));
      });
      const [latestExperience] = sortedExperiences;
      return `${latestExperience.jobTitle} at ${latestExperience.companyName}`;
    }
  }
  return '-';
}
