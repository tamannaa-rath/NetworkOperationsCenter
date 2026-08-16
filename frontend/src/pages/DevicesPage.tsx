import { useEffect, useState } from "react";

import {
  Server,
  Search,
  Plus,
  SlidersHorizontal,
  Trash2,
  Pencil,
} from "lucide-react";

import Header from "../components/Header";

import { 
  getDevices,
  createDevice,
  deleteDevice,
  updateDevice,
 } from "../services/device.service";

import type { 
  Device,
  CreateDeviceRequest,
  UpdateDeviceRequest,
 } from "../types/device.types";


function DevicesPage() {

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDevice, setShowAddDevice] = useState(false);

  const [hostname, setHostname] = useState("");
  const [ip_address, setIpAddress] = useState("");
  const [status, setStatus] = useState<"active" | "inactive" | "maintenance">("active");
  const [submitting, setSubmitting] = useState(false);

  const [editingDevice, setEditingDevice] = useState<Device | null>(null);


  // LOAD ALL DEVICES ON PAGE LOAD
  useEffect(() => {
    async function loadDevices() {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load devices");
      } finally {
        setLoading(false);
      }
    }
    loadDevices();
  }, []);


  // HANDLE ADD DEVICE FORM SUBMISSION
   async function handleAddDevice(
      event: React.FormEvent
    ) {
      event.preventDefault();
      try {
        setSubmitting(true);
        const newDevice: CreateDeviceRequest = {
          hostname,
          ip_address,
          status,
        };
        await createDevice(newDevice);

        // Get fresh data from backend
        const updatedDevices = await getDevices();

        setDevices(updatedDevices);

        // Reset form
        setHostname("");
        setIpAddress("");
        setStatus("active");

        setShowAddDevice(false);

      } catch (error) {
        console.error(error);
        setError("Failed to create device");
      } finally {
        setSubmitting(false);

      }
    }


    // HANDLE DELETE DEVICE
    async function handleDeleteDevice(id: number) {
      try {
        await deleteDevice(id);

        // Remove the deleted device from the UI
        setDevices((currentDevices) =>
          currentDevices.filter((device) => device.id !== id)
        );

      } catch (error) {
        console.error(error);
        setError("Failed to delete device");
      }
    }

    // HANDLE UPDATE DEVICE FORM SUBMISSION
    async function handleUpdateDevice(
      event: React.FormEvent
    ) {
      event.preventDefault();

      if (!editingDevice) {
        return;
      }

      try {
        setSubmitting(true);

        const updateData: UpdateDeviceRequest = {
          hostname: hostname || undefined,
          ip_address: ip_address || undefined,
          status: status || undefined,
        };

        const updatedDevice = await updateDevice(
          editingDevice.id,
          updateData
        );

        setDevices((currentDevices) =>
          currentDevices.map((device) =>
            device.id === updatedDevice.id
              ? updatedDevice
              : device
          )
        );

        setHostname("");
        setIpAddress("");
        setStatus("active");

        setEditingDevice(null);
        setShowAddDevice(false);

      } catch (error) {
        console.error(error);
        setError("Failed to update device");
      } finally {
        setSubmitting(false);
      }
    }


  return (
    <div className="noc-app">

      <Header />

      <main className="dashboard">

        {/* PAGE HEADER */}

        <div className="page-section-header">

          <div>

            <div className="page-title">
              Devices
            </div>

            <div className="page-subtitle">
              Monitor and manage network devices
            </div>

          </div>


          <button
            className="primary-button"
            onClick={() => setShowAddDevice(true)}
          >
            <Plus size={15} />
            Add Device
          </button>

        </div>


        {/* DEVICE TABLE */}

        <section className="widget devices-widget">

          <div className="widget-header">

            <div className="widget-title">

              <Server size={15} />

              Device Inventory

            </div>


            <div className="device-controls">

              <div className="search-box">

                <Search size={14} />

                <input
                  type="text"
                  placeholder="Search devices..."
                />

              </div>


              <select>

                <option>All Statuses</option>

                <option>Active</option>

                <option>Maintenance</option>

                <option>Inactive</option>

              </select>


              <button className="filter-button">

                <SlidersHorizontal size={14} />

                Filters

              </button>

            </div>

          </div>


          <div className="table-container">

            {loading && (
              <div className="table-message">
                Loading devices...
              </div>
            )}


            {error && (
              <div className="table-message error">
                {error}
              </div>
            )}


            {!loading && !error && (

              <table className="data-table">

                <thead>
                  <tr>
                    <th>Hostname</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>


                <tbody>

                  {devices.map((device) => (

                    <tr key={device.id}>

                      <td className="device-name">
                        {device.hostname}
                      </td>

                      <td>
                        {device.ip_address}
                      </td>

                      <td>
                        <span
                          className={`device-status ${device.status.toLowerCase()}`}
                        >
                          {device.status}
                        </span>
                      </td>

                      <td>
                        <div className="device-action-buttons">

                          <button
                            className="device-action-button"
                            type="button"
                            onClick={() => {
                              setEditingDevice(device);

                              setHostname(device.hostname);
                              setIpAddress(device.ip_address);
                              setStatus(device.status);

                              setShowAddDevice(true);
                            }}
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            className="device-action-button delete"
                            type="button"
                            onClick={() => handleDeleteDevice(device.id)}
                          >
                            <Trash2 size={14} />
                          </button>

                        </div>
                      </td>


                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </section>
        {showAddDevice && (
            <div className="modal-overlay">

              <div className="modal">

                <h2>Add Device</h2>

                <form
                  onSubmit={
                    editingDevice
                      ? handleUpdateDevice
                      : handleAddDevice
                  }
                  >
                
                  <div className="form-group">

                    <label>
                      Hostname
                    </label>

                    <input
                      type="text"
                      value={hostname}
                      onChange={(event) =>
                        setHostname(event.target.value)
                      }
                      placeholder="router-02"
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      IP Address
                    </label>

                    <input
                      type="text"
                      value={ip_address}
                      onChange={(event) =>
                        setIpAddress(event.target.value)
                      }
                      placeholder="192.168.1.12"
                    />

                  </div>


                  <div className="form-group">
                    <label>
                      Status
                    </label>

                    <select
                      value={status}
                      onChange={(event) =>
                        setStatus(
                          event.target.value as
                            | "active"
                            | "inactive"
                            | "maintenance"
                        )
                      }
                    >

                      <option value="active">
                        Active
                      </option>

                      <option value="maintenance">
                        Maintenance
                      </option>

                      <option value="inactive">
                        Inactive
                      </option>

                    </select>
                  </div>


                  <div className="modal-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => setShowAddDevice(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-button"
                      disabled={submitting}
                    >
                      {submitting
                        ? editingDevice
                          ? "Updating..."
                          : "Creating..."
                        : editingDevice
                          ? "Update Device"
                          : "Create Device"}
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}

      </main>

    </div>
  );
}


export default DevicesPage;