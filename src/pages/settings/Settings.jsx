import Layout from "/src/components/layouts/Layout";

function Settings() {

  return (

    <Layout>

      <div className="p-8">

        <h1 className="text-4xl font-bold mb-6">
          Settings
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-md">

          <p className="text-gray-600 text-lg">
            Application settings will appear here.
          </p>

        </div>

      </div>

    </Layout>
  );
}

export default Settings;