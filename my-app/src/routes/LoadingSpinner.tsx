export function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div>Loading...</div>
            {/* Или используйте спиннер: */}
            {/* <div className="spinner">⚡</div> */}
        </div>
    );
}