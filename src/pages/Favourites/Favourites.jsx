import Card from "../../components/Card";
import CardsGrid from "../../components/CardsGrid";
import GoBackHeader from "../../components/GoBackHeader";
import Title from "../../components/Title";
import "./Favourites.css";
import ErrorMessage from "../../components/ErrorMessage";

const Favourites = () => {
  return (
    <main className="app">
      <div className="wrapper">
        <GoBackHeader />
        {!!localStorage.length && <Title title="Favourite movies" />}
      </div>

      <>
        {!localStorage.length ? (
          <ErrorMessage message="No favourite movies found" />
        ) : (
          <CardsGrid>
            {Object.keys(localStorage).map((item) => {
              const movie = JSON.parse(localStorage.getItem(item));
              return <Card key={JSON.stringify(item)} {...movie} />;
            })}
          </CardsGrid>
        )}
      </>
    </main>
  );
};

export default Favourites;
