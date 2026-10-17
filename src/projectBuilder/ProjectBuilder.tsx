import { useState } from 'react';
import './projectBuilder.css'; 
 
 interface Service {
    id: number;
    name: string;
    price: number;
 };

 interface ServiceItem {
    service: Service;
    quantity: number;
};

 const availableServices: Service[] = [
    { id: 1, name: 'Разработка лендинга', price: 50000 },
    { id: 2, name: 'Интернет-магазин', price: 150000 },
    { id: 3, name: 'Корпоративный портал', price: 300000 },
    { id: 4, name: 'SEO-оптимизация', price: 20000 },
    ]

 export default function ProjectBuilder() {
    const [selectedServiceId, setSelectedServiceId] = useState<number | string >("");
    const [quantity, setQuantity] = useState(1);
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);


    const totalPrice = selectedServices.reduce((acc, item) => {
        acc += item.service.price * item.quantity;
        return acc;
    }, 0);


    function addService() {
        const service = availableServices.find(s => s.id === selectedServiceId)

        if (!service) return

        const existing = selectedServices.find(item => item.service === service);

        setSelectedServices(prev => existing ? 
            prev.map(el => el.service.id === service.id ? {...el, quantity: quantity} : el ) 
            : [...prev, {service, quantity}]);
        }

    function removeService(item: ServiceItem) {
        setSelectedServices(selectedServices.filter(el => el.service.id !== item.service.id));
    }

    return (
        <div className="roject-builder">
            <h2>Состав проекта</h2>
            <div className="add-service">
                <select
                    value={selectedServiceId}
                    onChange={e => { 
                        setSelectedServiceId(Number(e.target.value));
                        setQuantity(1); 
                        }
                        }>
                    <option value="" disabled>Выберите услугу</option>
                        {availableServices.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name} — {service.price.toLocaleString()} ₽
                        </option>
                        ))}
                </select>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={e => { 
                        setQuantity(Number(e.target.value))
                        }}
                    className="service-input"
                    disabled={!selectedServiceId}
                />
                <button onClick={addService} disabled={!selectedServiceId}>Добавить</button>
            </div>
            {selectedServices.length > 0 ? (
                <table className="services-table">
                    <thead>
                        <tr>
                            <th>Услуга</th>
                            <th>Цена за ед.</th>
                            <th>Кол-во</th>
                            <th >Сумма</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                    {selectedServices.map(item => (
                        <tr key={item.service.id}>
                            <td>{item.service.name}</td>
                            <td>{item.service.price.toLocaleString()} ₽</td>
                            <td>{item.quantity}</td>
                            <td>{(item.service.price * item.quantity).toLocaleString()} ₽</td>
                            <td>
                                <button onClick={() => removeService(item)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>
                                <strong>Итого:</strong>
                            </td>
                            <td colSpan={2}>
                                <strong>{totalPrice.toLocaleString()} ₽</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
            <p className="no-data">Пока не добавлено ни одной услуги</p>
            )}
        </div>
    )
 }