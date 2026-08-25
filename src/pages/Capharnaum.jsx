import residencesData from '../datas/residencesData.json';
import planningData from '../datas/capharnaumPlanning.json';
import intervenantsData from '../datas/capharnaumIntervenants.json';
import CapharnaumIntro from '../components/CapharnaumIntro';
import IntervenantsSection from '../components/IntervenantsSection';
import PlanningAgenda from '../components/PlanningAgenda';
import '../styles/Capharnaum.css';

function Capharnaum() {
    const babayagaData = residencesData.babayaga;
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
                title="Capharnaum"
                theme={babayagaData.theme}
                description={babayagaData.description}
                bannerImg={babayagaData.bannerImg}
                bannerImgM={babayagaData.bannerImgM}
                altBannerImg={babayagaData.altBannerImg}
                extraDescription=""
            />
            <PlanningAgenda months={planningMonths} />
            <IntervenantsSection intervenants={intervenantsData.intervenants} />
        </section>
    );
}

export default Capharnaum;
