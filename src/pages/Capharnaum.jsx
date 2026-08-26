import caphData from '../datas/capharnaumPage.json';
import planningData from '../datas/capharnaumPlanning.json';
import intervenantsData from '../datas/capharnaumIntervenants.json';
import CapharnaumIntro from '../components/CapharnaumIntro';
import PlanningAgenda from '../components/PlanningAgenda';
import '../styles/Capharnaum.css';

function Capharnaum() {
    const caph = caphData;
    const planningMonths = planningData.months.map((month) => ({
        ...month,
        activities: month.activities.map((activity) => ({
            ...activity,
            intervenant: intervenantsData.intervenants.find((intervenant) => intervenant.id === activity.intervenantId)
        }))
    }));

    return (
        <section className="capharnaum-page">
            <CapharnaumIntro
                title={caph.title}
                theme={caph.theme}
                description={caph.description}
                bannerImg={caph.bannerImg}
                bannerImgM={caph.bannerImgM}
                altBannerImg={caph.altBannerImg}
                openingDate={caph.openingDate}
                activities={caph.activities}
                atelierLabel={caph.atelierLabel}
                atelierUrl={caph.atelierUrl}
                hours={caph.hours}
                location={caph.location}
                img1={caph.img1}
                img2={caph.img2}
                img3={caph.img3}
                img4={caph.img4}
                alt1={caph.alt1}
                alt2={caph.alt2}
                alt3={caph.alt3}
                alt4={caph.alt4}
            />
            <PlanningAgenda months={planningMonths} />
        </section>
    );
}

export default Capharnaum;
