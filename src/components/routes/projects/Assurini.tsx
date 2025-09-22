import ProjectLayout from "../../layout/projects/ProjectLayout";
import assuriniImage from "../../../assets/jpg/Assurini.jpg";

export default function Assurini() {
  return (
    <ProjectLayout
      title="Assurini"
      subtitle="Digital Insurance Platform"
      category="Education"
      lastUpdated="Sep 20, 2025"
      version="1.0.0"
      heroImage={assuriniImage}
      appImage={assuriniImage}
      screenshots={[
        assuriniImage,
        // "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
        // "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format",
        // "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format"
      ]}
      description="Assurini is a digital insurance platform that leverages cutting-edge technologies to provide users with a seamless experience in managing their insurance needs. With features like real-time policy updates, instant claims processing, and personalized insurance recommendations, Assurini aims to revolutionize the way individuals interact with insurance services."
      features={[
        "User-friendly interface for easy navigation",
        "Instant claims processing with no paperwork",
        "Personalized insurance recommendations based on user profile",
        "Secure data handling with end-to-end encryption",
        "Offline access to essential features",
        "Integration with popular payment gateways for hassle-free transactions",
      ]}
      technologies={[
        "Jetpack Compose",
        "Kotlin",
        "Cipher", 
        "Ktor",
        "Apollo GraphQL",
        "Mapbox SDK",
        "Material You"
      ]}
      requirements={[
        "Android 11+",
        "2GB RAM minimum",
        "Internet connection for content sync",
      ]}
      downloadUrl="https://play.google.com/store/apps/details?id=com.assurini"
      githubUrl="https://github.com/YounesBouhouche/assurini"
      demoUrl="https://assurini-demo.netlify.app"
    >
    </ProjectLayout>
  );
}