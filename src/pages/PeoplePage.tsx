import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../services/people';
import { getPeopleWithParents } from '../helper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState('');

  const { slug: selectedSlug } = useParams();

  // const location = useLocation();
  // console.log(location);

  const isShowTable = !isLoading && people.length > 0;
  const isPeople = !isLoading
  && !errorMassage
  && people.length === 0;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleList => {
        setPeople(getPeopleWithParents(peopleList));
      })
      .catch(() => setErrorMassage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isShowTable && (
            <PeopleTable
              people={people}
              selectedSlug={selectedSlug}
            />
          )}

          {isPeople
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {errorMassage && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorMassage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
